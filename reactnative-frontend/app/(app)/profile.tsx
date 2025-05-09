import { useState } from "react";
import { View, ScrollView, Image, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Text } from "~/components/ui/text";
import { useColorScheme } from "~/lib/useColorScheme";
import {
  Calendar,
  Clock,
  Edit,
  LogOut,
  MapPin,
  Phone,
  Mail,
  User,
  Shield,
  Bell,
  CreditCard,
} from "lucide-react-native";
import CustomButton from "components/CustomButton";

export default function Profile() {
  const { isDarkColorScheme } = useColorScheme();
  const [activeTab, setActiveTab] = useState("bookings");

  // Mock user data
  const user = {
    name: "Rey Daug",
    email: "m@example.com",
    phone: "(555) 123-4567",
    avatar: "https://placeholder.com/100x100?text=RD",
    address: "123 Main St, Anytown, AT 12345",
    memberSince: "January 2023",
  };

  // Mock bookings data
  const bookings = [
    {
      id: "B12345",
      eventType: "Wedding Reception",
      date: "June 15, 2023",
      time: "5:00 PM - 11:00 PM",
      guests: 120,
      location: "Grand Ballroom, Hotel Majestic",
      status: "completed",
      package: "Premium Wedding Package",
      total: "$2,499.00",
    },
    {
      id: "B12346",
      eventType: "Corporate Lunch",
      date: "August 10, 2023",
      time: "12:00 PM - 3:00 PM",
      guests: 45,
      location: "Tech Park, Building A",
      status: "completed",
      package: "Corporate Lunch Package",
      total: "$1,125.00",
    },
    {
      id: "B12347",
      eventType: "Birthday Party",
      date: "May 20, 2024",
      time: "6:00 PM - 10:00 PM",
      guests: 30,
      location: "Home Address",
      status: "upcoming",
      package: "Birthday Celebration Package",
      total: "$599.00",
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "bookings":
        return (
          <View className="p-4">
            <Text className="mb-4 text-lg font-bold text-foreground">
              Your Bookings
            </Text>

            {bookings.map((booking) => (
              <View
                key={booking.id}
                className="mb-4 overflow-hidden border rounded-lg border-border bg-card"
              >
                <View className="flex-row items-start justify-between p-4 pb-0">
                  <View>
                    <Text className="text-base font-bold text-foreground">
                      {booking.eventType}
                    </Text>
                    <Text className="text-xs text-muted-foreground">
                      Booking #{booking.id}
                    </Text>
                  </View>
                  <View
                    className={`px-2 py-1 rounded ${
                      booking.status === "upcoming"
                        ? "bg-primary"
                        : "bg-transparent border border-border"
                    }`}
                  >
                    <Text
                      className={`text-xs font-medium ${
                        booking.status === "upcoming"
                          ? "text-primary-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {booking.status === "upcoming" ? "Upcoming" : "Completed"}
                    </Text>
                  </View>
                </View>

                <View className="p-4">
                  <View className="flex-row items-center mb-2">
                    <Calendar
                      size={16}
                      color={isDarkColorScheme ? "#999" : "#666"}
                      className="mr-2"
                    />
                    <Text className="text-sm text-foreground">
                      {booking.date}
                    </Text>
                  </View>
                  <View className="flex-row items-center mb-2">
                    <Clock
                      size={16}
                      color={isDarkColorScheme ? "#999" : "#666"}
                      className="mr-2"
                    />
                    <Text className="text-sm text-foreground">
                      {booking.time}
                    </Text>
                  </View>
                  <View className="flex-row items-center mb-2">
                    <MapPin
                      size={16}
                      color={isDarkColorScheme ? "#999" : "#666"}
                      className="mr-2"
                    />
                    <Text className="text-sm text-foreground">
                      {booking.location}
                    </Text>
                  </View>

                  <View className="h-px my-2 bg-border" />

                  <View className="flex-row justify-between mb-1">
                    <Text className="text-sm text-foreground">Package:</Text>
                    <Text className="text-sm text-foreground">
                      {booking.package}
                    </Text>
                  </View>
                  <View className="flex-row justify-between mb-1">
                    <Text className="text-sm text-foreground">Guests:</Text>
                    <Text className="text-sm text-foreground">
                      {booking.guests}
                    </Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-foreground">Total:</Text>
                    <Text className="text-sm font-bold text-foreground">
                      {booking.total}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity className="items-center p-3 border-t border-border">
                  <Text className="text-sm text-foreground">
                    {booking.status === "upcoming"
                      ? "Modify Booking"
                      : "View Details"}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        );

      case "account":
        return (
          <View className="p-4">
            <Text className="mb-4 text-lg font-bold text-foreground">
              Account Information
            </Text>

            <View className="p-4 mb-4 border rounded-lg border-border bg-card">
              <View className="mb-4">
                <Text className="mb-1 text-xs text-muted-foreground">
                  Full Name
                </Text>
                <Text className="text-base text-foreground">{user.name}</Text>
              </View>

              <View className="mb-4">
                <Text className="mb-1 text-xs text-muted-foreground">
                  Email Address
                </Text>
                <View className="flex-row items-center">
                  <Mail
                    size={16}
                    color={isDarkColorScheme ? "#999" : "#666"}
                    className="mr-2"
                  />
                  <Text className="text-base text-foreground">
                    {user.email}
                  </Text>
                </View>
              </View>

              <View className="mb-4">
                <Text className="mb-1 text-xs text-muted-foreground">
                  Phone Number
                </Text>
                <View className="flex-row items-center">
                  <Phone
                    size={16}
                    color={isDarkColorScheme ? "#999" : "#666"}
                    className="mr-2"
                  />
                  <Text className="text-base text-foreground">
                    {user.phone}
                  </Text>
                </View>
              </View>

              <View className="mb-4">
                <Text className="mb-1 text-xs text-muted-foreground">
                  Address
                </Text>
                <View className="flex-row items-center">
                  <MapPin
                    size={16}
                    color={isDarkColorScheme ? "#999" : "#666"}
                    className="mr-2"
                  />
                  <Text className="text-base text-foreground">
                    {user.address}
                  </Text>
                </View>
              </View>

              <CustomButton
                label="Edit Information"
                onPress={() => {}}
                buttonStyles="border border-border py-3 rounded mt-2"
                textStyle="text-foreground text-sm text-center"
              />
            </View>

            <View className="p-4 border rounded-lg border-border bg-card">
              <Text className="mb-4 text-base font-bold text-foreground">
                Payment Methods
              </Text>
              <View className="flex-row items-center justify-between p-3 mb-3 border rounded-lg border-border">
                <View className="flex-row items-center">
                  <CreditCard
                    size={20}
                    color={isDarkColorScheme ? "#999" : "#666"}
                    className="mr-3"
                  />
                  <View>
                    <Text className="text-sm text-foreground">
                      •••• •••• •••• 4242
                    </Text>
                    <Text className="text-xs text-muted-foreground">
                      Expires 12/25
                    </Text>
                  </View>
                </View>
                <View className="px-2 py-1 rounded bg-muted">
                  <Text className="text-xs">Default</Text>
                </View>
              </View>
              <CustomButton
                label="Add Payment Method"
                onPress={() => {}}
                buttonStyles="border border-border py-3 rounded"
                textStyle="text-foreground text-sm text-center"
              />
            </View>
          </View>
        );

      case "settings":
        return (
          <View className="p-4">
            <Text className="mb-4 text-lg font-bold text-foreground">
              Settings
            </Text>

            <View className="p-4 mb-4 border rounded-lg border-border bg-card">
              <Text className="mb-4 text-base font-bold text-foreground">
                Notifications
              </Text>
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center">
                  <Bell
                    size={20}
                    color={isDarkColorScheme ? "#999" : "#666"}
                    className="mr-3"
                  />
                  <Text className="text-sm text-foreground">
                    Email Notifications
                  </Text>
                </View>
                <View className="relative w-10 h-6 rounded-full bg-primary">
                  <View className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5" />
                </View>
              </View>

              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center">
                  <Bell
                    size={20}
                    color={isDarkColorScheme ? "#999" : "#666"}
                    className="mr-3"
                  />
                  <Text className="text-sm text-foreground">
                    SMS Notifications
                  </Text>
                </View>
                <View className="relative w-10 h-6 rounded-full bg-muted">
                  <View className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5" />
                </View>
              </View>

              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Bell
                    size={20}
                    color={isDarkColorScheme ? "#999" : "#666"}
                    className="mr-3"
                  />
                  <Text className="text-sm text-foreground">
                    Promotional Emails
                  </Text>
                </View>
                <View className="relative w-10 h-6 rounded-full bg-muted">
                  <View className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5" />
                </View>
              </View>
            </View>

            <View className="p-4 mb-4 border rounded-lg border-border bg-card">
              <Text className="mb-4 text-base font-bold text-foreground">
                Security
              </Text>
              <TouchableOpacity className="flex-row items-center justify-center p-3 mb-3 border rounded border-border">
                <Shield
                  size={16}
                  color={isDarkColorScheme ? "#fff" : "#333"}
                  className="mr-2"
                />
                <Text className="text-sm text-foreground">Change Password</Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center justify-center p-3 border rounded border-border">
                <User
                  size={16}
                  color={isDarkColorScheme ? "#fff" : "#333"}
                  className="mr-2"
                />
                <Text className="text-sm text-foreground">
                  Two-Factor Authentication
                </Text>
              </TouchableOpacity>
            </View>

            <View className="p-4 mb-6 border rounded-lg border-border bg-card">
              <Text className="mb-4 text-base font-bold text-destructive">
                Danger Zone
              </Text>
              <TouchableOpacity className="flex-row items-center justify-center p-3 mb-3 rounded bg-destructive">
                <LogOut size={16} color="#fff" className="mr-2" />
                <Text className="text-sm font-medium text-foreground">Sign Out</Text>
              </TouchableOpacity>

              <TouchableOpacity className="items-center p-3">
                <Text className="text-sm text-destructive">Delete Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-background">
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />

      {/* Profile Header */}
      <View className="p-4 bg-muted">
        <View className="flex-row items-center">
          <Image
            source={{ uri: user.avatar }}
            className="w-20 h-20 rounded-full"
          />
          <View className="flex-1 ml-4">
            <Text className="text-xl font-bold text-foreground">
              {user.name}
            </Text>
            <Text className="text-sm text-muted-foreground">
              Member since {user.memberSince}
            </Text>
            <TouchableOpacity className="flex-row items-center mt-2 border border-border rounded px-3 py-1.5 self-start">
              <Edit
                size={16}
                color={isDarkColorScheme ? "#fff" : "#333"}
                className="mr-1"
              />
              <Text className="text-sm text-foreground">Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View className="flex-row border-b border-border">
        <TouchableOpacity
          className={`flex-1 py-3 items-center ${
            activeTab === "bookings" ? "border-b-2 border-primary" : ""
          }`}
          onPress={() => setActiveTab("bookings")}
        >
          <Text
            className={`text-base ${
              activeTab === "bookings"
                ? "text-foreground font-medium"
                : "text-muted-foreground"
            }`}
          >
            Bookings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 py-3 items-center ${
            activeTab === "account" ? "border-b-2 border-primary" : ""
          }`}
          onPress={() => setActiveTab("account")}
        >
          <Text
            className={`text-base ${
              activeTab === "account"
                ? "text-foreground font-medium"
                : "text-muted-foreground"
            }`}
          >
            Account
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 py-3 items-center ${
            activeTab === "settings" ? "border-b-2 border-primary" : ""
          }`}
          onPress={() => setActiveTab("settings")}
        >
          <Text
            className={`text-base ${
              activeTab === "settings"
                ? "text-foreground font-medium"
                : "text-muted-foreground"
            }`}
          >
            Settings
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <ScrollView>{renderTabContent()}</ScrollView>
    </View>
  );
}
