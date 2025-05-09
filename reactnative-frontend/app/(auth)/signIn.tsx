"use client";
import { Text } from "~/components/ui/text";
import { useState } from "react";
import { View, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import CustomButton from "../../components/CustomButton";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    setLoading(true);
    // Implement sign in logic here
    setTimeout(() => {
      setLoading(false);
      // Navigate to the app's main screen after successful sign-in
      router.replace("/(app)/home");
    }, 1500);
  };

  const handleGoogleSignIn = () => {
    // Implement Google sign in
    Alert.alert("Google Sign In", "Google sign in would be implemented here");
  };

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />
      <View className="flex-1 justify-center px-6">
        <View className="border-[1.5px] border-white rounded-2xl p-6">
          <View className="mb-8">
            <Text className="text-foreground text-4xl font-bold mb-2">
              Sign in to your account
            </Text>
            <Text className="text-gray-400 text-xl">
              Enter your email below to sign in to your account
            </Text>
          </View>

          <View className="mb-4">
            <Text className="text-foreground text-lg mb-2">Email</Text>
            <TextInput
              className="bg-black text-foreground border border-gray-700 rounded-xl px-4 py-3 text-lg"
              placeholder="Email Address"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View className="mb-4">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-foreground text-lg">Password</Text>
            </View>
            <TextInput
              className="bg-black text-foreground border border-gray-700 rounded-xl px-4 py-3 text-lg"
              placeholder="Password"
              placeholderTextColor="#666"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Link href="/(auth)/forgotPassword" asChild>
              <TouchableOpacity>
                <Text className="text-foreground mt-4">Forgot password?</Text>
              </TouchableOpacity>
            </Link>
          </View>

          <CustomButton
            label={loading ? "Signing in..." : "Sign In"}
            onPress={handleSignIn}
            disabled={loading}
            buttonStyles="bg-white py-4 rounded-full mb-4"
            textStyle="text-background text-lg"
          />

          <View className="flex-row items-center my-6">
            <View className="flex-1 h-px bg-gray-700" />
            <Text className="text-gray-400 mx-4">Or continue with</Text>
            <View className="flex-1 h-px bg-gray-700" />
          </View>

          <CustomButton
            onPress={handleGoogleSignIn}
            buttonStyles="bg-black border border-gray-700 py-4 rounded-full mb-4"
            icon={require("../../assets/google.png")}
            iconStyle="w-5 h-5 mr-2"
            label="Sign in with Google"
            textStyle="text-foreground text-lg"
          />

          <View className="flex-row justify-center mt-6">
            <Text className="text-gray-400 text-lg">
              Don't have an account?{" "}
            </Text>
            <Link href="/(auth)/signUp" asChild>
              <TouchableOpacity>
                <Text className="text-foreground text-lg font-medium">
                  Sign up
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}
