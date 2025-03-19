
import React from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const propertyItems = [
  {
    title: "Luxury Homes",
    href: "/properties/luxury",
    description: "Exclusive high-end properties in premium locations."
  },
  {
    title: "Waterfront Properties",
    href: "/properties/waterfront",
    description: "Stunning properties with breathtaking water views."
  },
  {
    title: "Urban Apartments",
    href: "/properties/urban",
    description: "Modern apartments in the heart of vibrant cities."
  },
  {
    title: "Country Estates",
    href: "/properties/country",
    description: "Sprawling estates with privacy and natural beauty."
  }
];

const servicesItems = [
  {
    title: "Property Management",
    href: "/services/management",
    description: "Professional management services for your property."
  },
  {
    title: "Interior Design",
    href: "/services/design",
    description: "Bespoke interior design services for any space."
  },
  {
    title: "Real Estate Investment",
    href: "/services/investment",
    description: "Expert guidance for your property investments."
  }
];

const userItems = [
  {
    title: "My Profile",
    href: "/profile",
    description: "Manage your account settings and preferences."
  },
  {
    title: "My Favorites",
    href: "/favorites",
    description: "View and manage your saved properties."
  },
  {
    title: "Login",
    href: "/login",
    description: "Sign in to your LuxEstate account."
  },
  {
    title: "Register",
    href: "/register",
    description: "Create a new account to access premium features."
  }
];

export const DesktopNavigation = () => {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger>Properties</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {propertyItems.map((item) => (
                <ListItem
                  key={item.title}
                  title={item.title}
                  href={item.href}
                >
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {servicesItems.map((item) => (
                <ListItem
                  key={item.title}
                  title={item.title}
                  href={item.href}
                >
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/about">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              About
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/contact">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger>Account</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {userItems.map((item) => (
                <ListItem
                  key={item.title}
                  title={item.title}
                  href={item.href}
                >
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default DesktopNavigation;
