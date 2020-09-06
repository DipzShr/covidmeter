export const types = {
  STORE: 'STORE_COUNTRY_DATA',
};

const store = (data) => ({
  type: types.STORE,
  data,
})

export default {
  types,
  store,
}
