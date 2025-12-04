// ====================== EXTENSIVE ICON SET ======================
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import IcecreamIcon from "@mui/icons-material/Icecream";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PedalBikeIcon from "@mui/icons-material/PedalBike";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SavingsIcon from "@mui/icons-material/Savings";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaidIcon from "@mui/icons-material/Paid";

import HomeIcon from "@mui/icons-material/Home";
import WeekendIcon from "@mui/icons-material/Weekend";
import ChairIcon from "@mui/icons-material/Chair";

import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";

import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import CakeIcon from "@mui/icons-material/Cake";
import CelebrationIcon from "@mui/icons-material/Celebration";

import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import LuggageIcon from "@mui/icons-material/Luggage";

import PetsIcon from "@mui/icons-material/Pets";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import TvIcon from "@mui/icons-material/Tv";

import BoltIcon from "@mui/icons-material/Bolt";
import LightIcon from "@mui/icons-material/Light";

// ===== 40+ ICON OPTIONS =====
const iconSet = [
  // Food & Drinks
  { label: "Restaurant", icon: <RestaurantIcon /> },
  { label: "Cafe", icon: <LocalCafeIcon /> },
  { label: "Fast Food", icon: <FastfoodIcon /> },
  { label: "Ice Cream", icon: <IcecreamIcon /> },

  // Shopping
  { label: "Shopping Cart", icon: <ShoppingCartIcon /> },
  { label: "Store", icon: <StorefrontIcon /> },
  { label: "Shopping Bag", icon: <ShoppingBagIcon /> },

  // Transport
  { label: "Car", icon: <DirectionsCarIcon /> },
  { label: "Bike", icon: <PedalBikeIcon /> },
  { label: "Train", icon: <EmojiTransportationIcon /> },
  { label: "Taxi", icon: <LocalTaxiIcon /> },
  { label: "Fuel", icon: <LocalGasStationIcon /> },

  // Money
  { label: "Salary", icon: <PaidIcon /> },
  { label: "Savings", icon: <SavingsIcon /> },
  { label: "Money", icon: <AttachMoneyIcon /> },
  { label: "Credit Card", icon: <CreditCardIcon /> },

  // Home
  { label: "Home", icon: <HomeIcon /> },
  { label: "Furniture", icon: <ChairIcon /> },
  { label: "Living Room", icon: <WeekendIcon /> },

  // Health
  { label: "Health", icon: <HealthAndSafetyIcon /> },
  { label: "Medical", icon: <MedicalServicesIcon /> },
  { label: "Vaccines", icon: <VaccinesIcon /> },

  // Gifts & Events
  { label: "Gift", icon: <CardGiftcardIcon /> },
  { label: "Birthday", icon: <CakeIcon /> },
  { label: "Party", icon: <CelebrationIcon /> },

  // Travel
  { label: "Flight", icon: <FlightTakeoffIcon /> },
  { label: "Beach", icon: <BeachAccessIcon /> },
  { label: "Travel Bag", icon: <LuggageIcon /> },

  // Pets & Entertainment
  { label: "Pets", icon: <PetsIcon /> },
  { label: "Gaming", icon: <SportsEsportsIcon /> },
  { label: "Headphones", icon: <HeadphonesIcon /> },
  { label: "TV", icon: <TvIcon /> },

  // Utilities
  { label: "Electricity", icon: <BoltIcon /> },
  { label: "Light", icon: <LightIcon /> },
];

// ====================== EXTENDED COLOR SET ======================
const colorSet = [
  // Material Primary Palette
  "#1E88E5", "#1565C0", "#0D47A1",
  "#8E24AA", "#6A1B9A",
  "#43A047", "#2E7D32",
  "#FB8C00", "#F57C00",
  "#D81B60", "#AD1457",
  "#3949AB", "#283593",
  "#00897B", "#00695C",

  // Warm / Pastel
  "#EF9A9A", "#FFCC80", "#FFE082",
  "#CE93D8", "#9FA8DA",
  "#B3E5FC", "#80DEEA",
];

export {iconSet, colorSet}