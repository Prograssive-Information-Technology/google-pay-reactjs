import React, { useState } from "react";
import { Container, Typography, TextField } from "@mui/material";
import GooglePayButton from "@google-pay/button-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
	const [paymentAmount, setPaymentAmount] = useState("5.00"); // Default payment amount

	const handleAmountChange = (event) => {
		setPaymentAmount(event.target.value);
	};

	const handlePaymentSuccess = (paymentData) => {
		console.log("Payment successful:", paymentData);
		toast.success("Payment successful!");
	};

	const handlePaymentError = (error) => {
		console.error("Payment error:", error);
		toast.error("Payment failed. Please try again.");
	};

	const paymentRequest = {
		apiVersion: 2,
		apiVersionMinor: 0,
		allowedPaymentMethods: [
			{
				type: "CARD",
				parameters: {
					allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
					allowedCardNetworks: [
						"AMEX",
						"DISCOVER",
						"JCB",
						"MASTERCARD",
						"VISA",
					],
				},
				tokenizationSpecification: {
					type: "PAYMENT_GATEWAY",
					parameters: {
						gateway: "example",
						gatewayMerchantId: "exampleGatewayMerchantId",
					},
				},
			},
		],
		merchantInfo: {
			merchantId: "BCR2DN4T67NOFIDX",
			merchantName: "PiTech",
		},
		transactionInfo: {
			totalPriceStatus: "FINAL",
			totalPriceLabel: "Total",
			totalPrice: paymentAmount, // Dynamic payment amount
			currencyCode: "USD",
			countryCode: "US",
		},
		environment: "PRODUCTION", // Set environment to PRODUCTION for live use
	};

	return (
		<Container className="container" maxWidth="md">
			<ToastContainer />
			<Typography variant="h4" align="center" gutterBottom>
				Support My Work ☕️
			</Typography>
			<div className="payment-container">
				<div className="payment-info">
					<TextField
						type="number"
						label="Enter amount"
						variant="outlined"
						value={paymentAmount}
						onChange={handleAmountChange}
						fullWidth
					/>
				</div>
				<GooglePayButton
					className="google-pay-button"
					environment="PRODUCTION"
					paymentRequest={paymentRequest}
					onLoadPaymentData={handlePaymentSuccess}
					onError={handlePaymentError}
				/>
				<div className="motivational-speech">
					<Typography variant="body1">
						Because every great idea starts with coffee.
					</Typography>
					<Typography variant="body1">
						Your support keeps me fueled and motivated to create more.
					</Typography>
					<Typography variant="body1">
						Thank you for your generosity!
					</Typography>
				</div>
			</div>
		</Container>
	);
}

export default App;
