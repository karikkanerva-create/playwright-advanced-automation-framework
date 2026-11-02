export const userListSchema = {
  type: 'object',
  properties: {
    page: {
      type: 'number'
    },
    per_page: {
      type: 'number'
    },
    data: {
      type: 'array'
    }
  },
  required: ['page', 'per_page', 'data']
};