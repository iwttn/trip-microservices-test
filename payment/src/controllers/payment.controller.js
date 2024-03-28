import { createPaymentService, generatePayService } from '../services/index.js'

export async function createPaymentController(req, res) {
  try {
    const payment = req.body;
    const paymentCreated = await createPaymentService(payment);

    if(!paymentCreated.created) {
        res.status(500).json(paymentCreated)
    }

    res.status(200).json(paymentCreated);

  } catch (err) {
    console.error(err.message);
  }
}

export async function generatePayController(req, res) {
    try {
      const { paymentCode } = req.query;
      const pay = await generatePayService(paymentCode);
        
      if(!pay.created) {
          res.status(500).json(pay)
      }
  
      res.status(200).json(pay);
  
    } catch (err) {
      console.error(err.message);
    }
  }
