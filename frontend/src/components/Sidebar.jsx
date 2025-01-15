import React, { useState, useEffect } from "react";

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
  Checkbox,
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

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <Card className='h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5'>
      <div className='mb-2 p-4'>
        <Typography variant='h5' color='blue-gray'>
          Filters
        </Typography>
      </div>
      <List>
        <Accordion
          open={open}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className='p-0' selected={open}>
            <AccordionHeader className='border-b-0 p-3'>
              <Typography color='blue-gray' className='mr-auto font-normal'>
                Gender
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className='py-1'>
            <List className='p-0'>
              <ListItem className="gap-4">
                {/* todo Map categories here */}
                <input type='checkbox' name='' id='' />
                Men
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open}
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
                Category
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className='py-1'>
            <List className='p-0'>
            <ListItem className="gap-4">
                <input type='checkbox' name='' id='' />
                Sneakers
              </ListItem>
              <ListItem className="gap-4">
                <input type='checkbox' name='' id='' />
                Jeans
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <ListItem>
          Price
          <ListItemSuffix>
            <Chip value='14' size='sm' variant='ghost' color='blue-gray' className='rounded-full' />
          </ListItemSuffix>
        </ListItem>
        <ListItem>Brands</ListItem>
        <ListItem>Tags</ListItem>
        <ListItem>Size & Fit</ListItem>
      </List>
    </Card>
  );
};

export default Sidebar;
