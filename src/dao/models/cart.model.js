import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
products: [
    {
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    },
],
});

cartSchema.pre("find", function () {
    this.populate("products.product");
});

export const CartModel = mongoose.model("Cart", cartSchema);