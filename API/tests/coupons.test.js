const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const { request, authHeader } = require('../utils/apiClient');
const couponSchema = require('../schemas/coupon.schema');

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validateCouponSchema = ajv.compile(couponSchema);

// Rastreia os IDs de cupons criados durante a execução dos testes, para
// que sejam removidos ao final e não fiquem acumulando na loja a cada
// execução da suíte (limpeza de dados de teste).
const createdCouponIds = [];

describe('US-0003 - API de cupons', () => {
  // CT001 - Caminho feliz: criar cupom com dados válidos
  test('CT001 - deve criar um cupom com dados válidos e retornar contrato correto', async () => {
    const uniqueCode = `Teste${Date.now()}`;

    const response = await request
      .post('/wp-json/wc/v3/coupons')
      .set('Authorization', authHeader())
      .send({
        code: uniqueCode,
        amount: '10',
        discount_type: 'fixed_product',
        description: 'Cupom de desconto de teste'
      });

    expect(response.status).toBe(201);
    expect(response.body.code).toBe(uniqueCode.toLowerCase());
    expect(response.body.amount).toBe('10.00');
    expect(response.body.discount_type).toBe('fixed_product');

    const isValid = validateCouponSchema(response.body);
    expect(isValid).toBe(true);

    createdCouponIds.push(response.body.id);
  });

  // CT002 - Caminho negativo: requisição sem autenticação
  test('CT002 - deve retornar 401 ao tentar criar cupom sem autenticação', async () => {
    const response = await request
      .post('/wp-json/wc/v3/coupons')
      .send({
        code: `SemAuth${Date.now()}`,
        amount: '10',
        discount_type: 'fixed_product',
        description: 'Cupom sem autenticação'
      });

    expect(response.status).toBe(401);
  });

  // CT003 - Caminho negativo: impedir cupom duplicado
  //
  // Validação reforçada: além do status HTTP, confirmamos o código de erro
  // específico retornado pela API do WooCommerce para essa situação
  // (woocommerce_rest_coupon_code_already_exists), em vez de aceitar
  // qualquer status >= 400 - isso evita que o teste passe "por acidente"
  // caso a API retorne 400 por outro motivo (ex.: payload malformado).
  test('CT003 - não deve permitir cadastrar cupom com código já existente', async () => {
    const duplicatedCode = `Duplicado${Date.now()}`;

    const first = await request
      .post('/wp-json/wc/v3/coupons')
      .set('Authorization', authHeader())
      .send({
        code: duplicatedCode,
        amount: '10',
        discount_type: 'fixed_product',
        description: 'Primeiro cupom'
      });

    expect(first.status).toBe(201);
    createdCouponIds.push(first.body.id);

    const response = await request
      .post('/wp-json/wc/v3/coupons')
      .set('Authorization', authHeader())
      .send({
        code: duplicatedCode,
        amount: '15',
        discount_type: 'percent',
        description: 'Cupom duplicado'
      });

    expect(response.status).toBe(400);
    expect(response.body.code).toBe('woocommerce_rest_coupon_code_already_exists');
  });

  // CT007 - Caminho negativo: buscar cupom por ID inexistente
  test('CT007 - deve retornar 404 ao buscar cupom com ID inexistente', async () => {
    const idInexistente = 999999999;

    const response = await request
      .get(`/wp-json/wc/v3/coupons/${idInexistente}`)
      .set('Authorization', authHeader());

    expect(response.status).toBe(404);
  });

  // Limpeza: remove permanentemente (force=true, sem passar pela lixeira)
  // todos os cupons criados pelos testes acima, para que execuções
  // repetidas da suíte não acumulem dados de teste na loja.
  afterAll(async () => {
    for (const id of createdCouponIds) {
      const res = await request
        .delete(`/wp-json/wc/v3/coupons/${id}`)
        .query({ force: true })
        .set('Authorization', authHeader());

      // Falha visível se a limpeza não funcionar (o supertest não lança
      // erro em respostas 4xx/5xx por conta própria).
      expect(res.status).toBe(200);
    }
  });
});
