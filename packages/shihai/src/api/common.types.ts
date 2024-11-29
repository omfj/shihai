export type ErrorMessage = {
  error: string;
};

export type SuccessOrError =
  | {
      sucess: true;
    }
  | {
      success: false;
      error: string;
    };
