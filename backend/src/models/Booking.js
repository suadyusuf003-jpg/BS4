import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { BOOKING_STATUS } from "../config/constants.js";
import User from "./User.js";
import Room from "./Room.js";

const Booking = sequelize.define(
  "Booking",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        BOOKING_STATUS.PENDING,
        BOOKING_STATUS.APPROVED,
        BOOKING_STATUS.REJECTED
      ),
      defaultValue: BOOKING_STATUS.PENDING,
    },
  },
  { tableName: "bookings", timestamps: true }
);

// Associations
Booking.belongsTo(User, { foreignKey: "userId", as: "user" });
Booking.belongsTo(Room, { foreignKey: "roomId", as: "room" });
User.hasMany(Booking, { foreignKey: "userId" });
Room.hasMany(Booking, { foreignKey: "roomId" });

export default Booking;