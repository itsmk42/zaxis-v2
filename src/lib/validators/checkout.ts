import { z } from "zod";

const indianPhoneRegex = /^[6-9]\d{9}$/;
const pincodeRegex = /^\d{6}$/;

export const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
    "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh",
    "Lakshadweep", "Puducherry"
] as const;

export const checkoutSchema = z.object({
    // Personal Info
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(indianPhoneRegex, "Enter a valid 10-digit Indian mobile number"),

    // Address
    addressLine1: z.string().min(5, "Address too short"),
    addressLine2: z.string().optional(),
    landmark: z.string().optional(),
    city: z.string().min(2, "City is required"),
    state: z.enum(indianStates, {
        errorMap: () => ({ message: "Please select a valid state" }),
    }),
    pincode: z.string().regex(pincodeRegex, "Enter a valid 6-digit Pincode"),

    // Payment
    paymentMethod: z.enum(["COD", "UPI"]),
    transactionId: z.string().optional(), // Required only if UPI
}).refine((data) => {
    if (data.paymentMethod === "UPI" && (!data.transactionId || data.transactionId.length < 5)) {
        return false;
    }
    return true;
}, {
    message: "Transaction ID is required for UPI payments",
    path: ["transactionId"],
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
