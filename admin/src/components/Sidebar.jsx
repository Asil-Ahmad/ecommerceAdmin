import React, { useContext, useState } from "react";

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { ShopContext } from "../context/ShopContext";

const Sidebar = () => {
  const [open, setOpen] = useState(0);
  const { navigate, test } = useContext(ShopContext);
  // console.log(test);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className='h-[100vh] sticky top-0 w-full max-w-[16rem] p-4 shadow-xl shadow-blue-gray-900/5'>
      <div className='mb-2 p-4'>
        <Typography variant='h5' color='blue-gray'>
          Store
        </Typography>
      </div>
      <List>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className='p-0' selected={open === 1}>
            <AccordionHeader
              onClick={() => {
                handleOpen(1), navigate("/");
              }}
              className='border-b-0 p-3'
            >
              <ListItemPrefix>
                <PresentationChartBarIcon className='h-5 w-5' />
              </ListItemPrefix>
              <Typography color='blue-gray' className='mr-auto font-normal'>
                Dashboard
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className='py-1'>
            <List className='p-0'>
              <ListItem>Orders</ListItem>
              <ListItem>Customers</ListItem>
              <ListItem>Coupons</ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className='p-0' selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)} className='border-b-0 p-3'>
              <ListItemPrefix>
                <ShoppingBagIcon className='h-5 w-5' />
              </ListItemPrefix>
              <Typography color='blue-gray' className='mr-auto font-normal'>
                Products
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className='py-1'>
            <List className='p-0'>
              <ListItem onClick={() => navigate("/all_products")}>All Products</ListItem>
              <ListItem onClick={() => navigate("/add_new_product")}>Add Product</ListItem>
              <ListItem>Brands</ListItem>
              <ListItem onClick={()=>navigate("/categories")}>Categories</ListItem>
              <ListItem>Tags</ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className='h-5 w-5' />
          </ListItemPrefix>
          Inbox
          <ListItemSuffix>
            <Chip value='14' size='sm' variant='ghost' color='blue-gray' className='rounded-full' />
          </ListItemSuffix>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className='h-5 w-5' />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className='h-5 w-5' />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className='h-5 w-5' />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
};

export default Sidebar;
