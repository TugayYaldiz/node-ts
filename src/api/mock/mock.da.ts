interface IGetMockDA {
  id: string;
}

export const getMockDA = async ({ id }: IGetMockDA) => {
  try {
    return id;
  } catch (error) /* istanbul ignore next */ {
    throw error;
  }
};
