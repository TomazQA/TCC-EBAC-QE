module.exports = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Coupon',
  type: 'object',
  required: ['id', 'code', 'amount', 'discount_type', 'date_created'],
  properties: {
    id: { type: 'integer' },
    code: { type: 'string' },
    amount: { type: 'string' },
    discount_type: { type: 'string', enum: ['percent', 'fixed_cart', 'fixed_product'] },
    description: { type: 'string' },
    date_created: { type: 'string' },
    date_modified: { type: 'string' }
  }
};
