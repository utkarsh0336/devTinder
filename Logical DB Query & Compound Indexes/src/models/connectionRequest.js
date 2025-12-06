const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{value} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);

// connectionRequestSchema.pre("save", function (next) {
//   const connectionRequest = this;

//   if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
//     // throw new Error("You Cannot send connection request to yourself");
//      return next(new Error("Cannot send connection request to yourself"));
//   }

//   next();

// });

connectionRequestSchema.pre("save", async function () {
  if (this.fromUserId.equals(this.toUserId)) {
    throw new Error("Cannot send connection request to yourself");
  }
});

const ConnectionRequestModel = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequestModel;
