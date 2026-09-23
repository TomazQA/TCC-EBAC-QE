const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const { request, authHeader } = require('../utils/apiClient');
const couponSchema = require('../schemas/coupon.schema');

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validateCouponSchema = ajv.compile(couponSchema);

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

  // CT004 (referência ao plano de testes) - impedir cupom duplicado
  test('CT004 - não deve permitir cadastrar cupom com código já existente', async () => {
    const duplicatedCode = `Duplicado${Date.now()}`;

    await request
      .post('/wp-json/wc/v3/coupons')
      .set('Authorization', authHeader())
      .send({
        code: duplicatedCode,
        amount: '10',
        discount_type: 'fixed_product',
        description: 'Primeiro cupom'
      });

    const response = await request
      .post('/wp-json/wc/v3/coupons')
      .set('Authorization', authHeader())
      .send({
        code: duplicatedCode,
        amount: '15',
        discount_type: 'percent',
        description: 'Cupom duplicado'
      });

    expect(response.status).toBeGreaterThanOrEqual(400);
  });

  // CT007 (referência ao plano de testes) - buscar cupom por ID inexistente
  test('CT007 - deve retornar 404 ao buscar cupom com ID inexistente', async () => {
    const idInexistente = 999999999;

    const response = await request
      .get(`/wp-json/wc/v3/coupons/${idInexistente}`)
      .set('Authorization', authHeader());

    expect(response.status).toBe(404);
  });
});
