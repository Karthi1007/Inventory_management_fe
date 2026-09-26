import actions from "./Actions";

const initialState = {
  products: [],
  product: null,

  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },

  loading: false,
  error: null,

  addSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    // GET ALL
    case actions.GET_PRODUCTS:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actions.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload?.data || [],
        pagination:
          action.payload?.pagination || state.pagination,
        error: null,
      };

    case actions.GET_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // GET BY ID
    case actions.GET_PRODUCT_BY_ID:
      return {
        ...state,
        loading: true,
        error: null,
        product: null,
      };

    case actions.GET_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload?.data || null,
        error: null,
      };

    case actions.GET_PRODUCT_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        product: null,
      };

    // ADD
    case actions.ADD_PRODUCT:
      return {
        ...state,
        loading: true,
        addSuccess: false,
        error: null,
      };

    case actions.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        addSuccess: true,
        error: null,
        products: [
          action.payload?.data,
          ...state.products,
        ],
      };

    case actions.ADD_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        addSuccess: false,
        error: action.payload,
      };

    // UPDATE
    case actions.UPDATE_PRODUCT:
      return {
        ...state,
        loading: true,
        updateSuccess: false,
        error: null,
      };

    case actions.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        updateSuccess: true,
        error: null,
      };

    case actions.UPDATE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        updateSuccess: false,
        error: action.payload,
      };

    // DELETE
    case actions.DELETE_PRODUCT:
      return {
        ...state,
        loading: true,
        deleteSuccess: false,
        error: null,
      };

    case actions.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteSuccess: true,
        error: null,
        products: state.products.filter(
          (product) =>
            product._id !== action.payload &&
            product.id !== action.payload
        ),
      };

    case actions.DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default productReducer;