import { CalendarDays, ChefHat, Clock } from "lucide-react";
import React from "react";

export const UsersGuide = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-3xl">
            Booking your catering service with us is simple and straightforward.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
              <CalendarDays className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">1. Choose Your Date</h3>
            <p className="text-muted-foreground">
              Select your event date and check our availability through our
              online booking system.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
              <ChefHat className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">2. Customize Your Menu</h3>
            <p className="text-muted-foreground">
              Work with our chefs to create a personalized menu that suits your
              taste and budget.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">3. Enjoy Your Event</h3>
            <p className="text-muted-foreground">
              Relax and enjoy your event while our professional team takes care
              of everything.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
