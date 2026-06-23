export interface PaymentService {
  readonly provider: string;
  createCheckout(): Promise<{ status: "pending-configuration"; message: string }>;
}

export const pendingPaymentService: PaymentService = {
  provider: "unconfigured",
  async createCheckout() {
    return { status: "pending-configuration", message: "Payment integration is pending. No payment was attempted." };
  },
};
