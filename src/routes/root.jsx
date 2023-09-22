import React from "react";
import { Outlet, Link, useLoaderData, Form } from "react-router-dom";
import { Stack, HStack, VStack, Text, Box,Icon, } from "@chakra-ui/react";
import { FiSlack } from "react-icons/fi";

import { getContacts, createContact } from "../contacts";

export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}
export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
  const { contacts } = useLoaderData();
  console.log("contactsRoot->", contacts.length);
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          {/*           <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <Form method="post">
            <Button colorScheme="blue" type="submit">
              New
            </Button>
          </Form> */}
          <Stack direction="row" spacing={2} >
            <VStack >
              <HStack align={"center"}>
                <Box>
                  <FiSlack w="140px" h="40px" />{" "}
                </Box>
                <Box>
                  <Text fontSize="2xl">BGAS (BUDGET ASSET)</Text>
                </Box>
              </HStack>
              <HStack>
                <Box>
                  <Text fontSize="sm">ระบบคำขอครุภัณฑ์ฯ</Text>
                </Box>
              </HStack>
            </VStack>
          </Stack>
        </div>
{/*         <nav>
              {contacts.map((contact) => (
                  <Link to={`BGAS/${contact.link}`} key={contact.id}>
                  <Icon as={contact.icon} />
                    <Text
                      as="span"
                      flex="1"
                      textAlign="left"
                      pl="2"
                      fontSize={"lg"}
                    >{contact.name}</Text>
                  </Link>
    
              ))}
        </nav> */}
         <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <Link to={`contacts/${contact.id}`}>
                    {contact.name ? (
                      <>
                        {contact.name} 
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.link && <span>★</span>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
