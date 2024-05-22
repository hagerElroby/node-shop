const router = require("express").Router();
const stripe = require("stripe")("sk_test_51MYgxkEwzb9TdYEfjrO4Gjghfpigoci7VOoIPykMSi7TCMAOcikY6SPDNRDJHMkOJaeyKMUauFPbkzQfcjR5DMTf00XHQ2qfrB");

router.post("/payment", async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: "usd",
            payment_method_data: {
                type: "card",
                card: {
                    token: req.body.tokenId,
                },
            },
            confirm: true,
            return_url: "http://localhost:3000/success"
        });
        res.status(200).json(paymentIntent);
    } catch (error) {
        console.error("Stripe Error: ", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
