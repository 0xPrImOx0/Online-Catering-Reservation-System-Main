import { View, Text, Image, ScrollView, FlatList } from "react-native";
import React from "react";
import { Badge } from "~/components/ui/badge";
import { CheckCircle2Icon, X } from "lucide-react-native";
import { Card } from "~/components/ui/card";
import { Link, useLocalSearchParams } from "expo-router";
import { cateringPackages } from "~/lib/packages-metadata";
import { Button } from "~/components/ui/button";
import { menuItems } from "~/lib/menu-lists";

export default function PackageShowcasePage() {
  const { packageId } = useLocalSearchParams();
  const pkg = cateringPackages.find((item) => item._id === packageId);
  // const displayInclusions =
  //   platedInclusions.length > 0 ? platedInclusions : pkg.inclusions;
  if (!pkg) {
    return <Text>Package Not Found!</Text>; // Handle the case where the package is not found
  }
  return (
    <View className="h-full pt-4 bg-background">
      <View className="sticky top-0 z-10 bg-background border-t-slate-400">
        {/* Image with fixed height */}
        <View className="relative w-full h-[200px]">
          <Image
            source={{ uri: pkg.imageUrl }}
            alt={pkg.name}
            className="object-cover h-[200px]"
          />
          <View className="absolute top-2 right-2">
            <Badge
              variant={pkg.available ? "default" : "destructive"}
              className={`
                  ${
                    pkg.available
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-red-500"
                  }
                `}
            >
              <Text className="text-foreground">
                {pkg.available ? "Available" : "Unavailable"}
              </Text>
            </Badge>
          </View>
        </View>
        {/* Title and Description Section */}
        <View className="p-4 border-b bg-background border-border">
          <Text className="text-2xl font-bold text-foreground">{pkg.name}</Text>
          <Text className="mt-2 text-muted-foreground">{pkg.description}</Text>
          <View className="flex-row items-center justify-between px-3 py-2 mt-4 rounded-md bg-primary text-primary-foreground">
            <Text className="text-lg font-bold">
              {/* {isPlated
                  ? `&#8369; ${pkg.pricePerPaxWithServiceCharge.toFixed(
                      2
                    )} per pax`
                  : `&#8369; ${pkg.pricePerPax.toFixed(2)} per pax`} */}
              &#8369; {pkg.pricePerPax.toFixed(2)} per pax
            </Text>
            {/* {isPlated && (
                <Text className="block text-xs text-primary-foreground/80">
                  Includes {pkg?.serviceHours} hours service
                </Text>
              )} */}
            <Button asChild variant={"secondary"}>
              <Link href={`/book-now`} className="text-foreground">
                Book Now
              </Link>
            </Button>
          </View>
        </View>
      </View>
      {/* Scrollable Content Section */}
      <ScrollView
        contentContainerClassName=" gap-6 pb-12"
        className="flex-1 h-full p-4 pb-0 "
      >
        <View className="gap-4">
          <Card className="p-4">
            <Text className="mb-3 text-lg font-semibold text-foreground">
              Package Details
            </Text>
            <View className="gap-2">
              <View className="flex-row justify-between">
                <Text className="text-muted-foreground">Minimum Guests:</Text>
                <Text className="text-foreground">{pkg.minimumPax} pax</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-muted-foreground">Recommended:</Text>
                <Text className="text-foreground">
                  {pkg.recommendedPax} pax
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-muted-foreground">Maximum Guests:</Text>
                <Text className="text-foreground">{pkg.maximumPax} pax</Text>
              </View>
              {/* {isPlated && (
                  <View className="flex justify-between">
                    <Text className="text-muted-foreground">
                      Service Hours:
                    </Text>
                    <Text>{pkg?.serviceHours} hours</Text>
                  </View>
                )} */}
            </View>
          </Card>
          <Card className="p-4 space-y-2">
            <Text className="mb-3 text-lg font-semibold text-foreground">
              Menu Options:
            </Text>
            {pkg.options.map((option, index) => (
              <View key={index} className="flex-row justify-between mb-2">
                <Text className="text-muted-foreground">
                  {option.category}:
                </Text>
                <Text className="text-foreground">
                  {option.count} selection{option.count > 1 ? "s" : ""}
                </Text>
              </View>
            ))}
          </Card>
        </View>
        <Card className="p-4">
          <Text className="mb-3 text-lg font-semibold text-foreground">
            Inclusions
          </Text>
          <View className="gap-2">
            {/* Show rice trays for buffet and plated packages */}
            {pkg.packageType === "Event" && (
              <View className="flex items-center col-span-1 gap-2">
                <Text className="font-medium">
                  <CheckCircle2Icon className="w-4 h-4 text-green-500" />
                  {Math.ceil(pkg.minimumPax / 2)} trays of steamed rice (good
                  for {pkg.minimumPax / 2} pax)
                </Text>
              </View>
            )}
            {pkg.inclusions.map((inclusion, index) => (
              <View key={index} className="flex-row items-center gap-3 mb-1">
                <CheckCircle2Icon className="w-4 h-4" color={"green"} />
                <Text className="text-justify text-foreground">
                  {inclusion.includes}
                </Text>
              </View>
            ))}
          </View>
        </Card>
        <Card className="p-4">
          <Text className="mb-3 text-lg font-semibold text-foreground">
            Sample Menu Selection
          </Text>
          <FlatList
            data={pkg.options}
            numColumns={2}
            scrollEnabled={false}
            keyExtractor={(item) => item.category}
            renderItem={({ item, index }) => (
              <View key={index} className="flex-1 gap-2">
                <Text className="font-medium text-foreground">
                  {item.category} Options
                </Text>
                <View className="gap-1 mt-2">
                  {menuItems
                    .filter((menu) => menu.category === item.category)
                    .slice(0, 3)
                    .map((menu) => (
                      <View
                        key={menu.name}
                        className="flex-row items-center gap-2"
                      >
                        <CheckCircle2Icon className="w-4 h-4" color={"green"} />
                        <Text className=" text-foreground">{menu.name}</Text>
                      </View>
                    ))}
                  <View className="mt-2 mb-5 text-muted-foreground">
                    <Text className="text-foreground">
                      ...and more options available
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        </Card>
      </ScrollView>
    </View>
  );
}
