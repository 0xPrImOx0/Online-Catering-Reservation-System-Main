"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomerPackageCard from "./CustomerPackageCard";
import CustomPackageForm from "./CustomPacakgeForm";
import SelectedEventContainer from "./SelectedEventContainer";
import PlatedWarning from "../PlatedWarning";
import { cateringPackages } from "@/lib/customer/packages-metadata";

// async function fetchPackages() {
//   const packages = await axios.get("http://localhost:5500/api/packages");
//   return packages.data.data;
// }

export default function CateringPackages() {
  const [activeTab, setActiveTab] = useState<string>("Buffet");
  const [isPlated, setIsPlated] = useState(false);
  // const [cateringPackages, setCateringPackages] = useState<
  //   CateringPackagesProps[]
  // >([]);

  // useEffect(() => {
  //   const getPackages = async () => {
  //     try {
  //       const pkg = await fetchPackages();
  //       if (pkg) setCateringPackages(pkg);
  //     } catch (error) {
  //       console.error("Failed to fetch menus:", error); // Log any errors
  //       setCateringPackages([]); // Set empty array if fetch fails
  //     }
  //   };
  //   getPackages();
  // }, []);

  const buffetPlatedPackages = cateringPackages.filter(
    (pkg) => pkg.packageType === "BuffetPlated"
  );

  useEffect(() => {
    setIsPlated(activeTab === "Plated");
  }, [activeTab]);

  const TabsTriggerStyle = ({
    value,
    title,
  }: {
    value: string;
    title: string;
  }) => {
    return (
      <TabsTrigger
        value={value}
        className="flex-1 hover:bg-muted-foreground/10 data-[state=active]:after:bg-foreground data-[state=active]:hover:bg-muted-foreground/10 relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
      >
        {title}
      </TabsTrigger>
    );
  };

  return (
    <div>
      <div className="">
        <h1 className="text-5xl font-bold mb-4 ">
          <span className="capitalize">{activeTab}</span> Packages
        </h1>

        <p className="text-muted-foreground mb-10">
          Authentic filipino {activeTab} cuisine for your special events and
          celebrations
        </p>
      </div>

      <Tabs
        defaultValue="Buffet"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="text-foreground overflow-x-auto scrollbar-none w-full justify-between h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1">
          <TabsTriggerStyle value="Buffet" title="Buffet Packages" />
          <TabsTriggerStyle value="Plated" title="Plated Course" />
          <TabsTriggerStyle value="Event" title="Event Packages" />
          <TabsTriggerStyle value="Custom" title="Create Your Own Package" />
        </TabsList>

        <TabsContent value="Buffet" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buffetPlatedPackages.map((pkg, index) => (
              <CustomerPackageCard key={index} item={pkg} isPlated={isPlated} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="Plated" className="mt-6 space-y-8">
          <PlatedWarning />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buffetPlatedPackages.map((pkg, index) => (
              <CustomerPackageCard key={index} item={pkg} isPlated={isPlated} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="Event" className="mt-0">
          <SelectedEventContainer cateringPackages={cateringPackages} />
        </TabsContent>
        <TabsContent value="Custom" className="mt-12 sm:mx-0 lg:mx-8 xl:mx-20">
          <CustomPackageForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
