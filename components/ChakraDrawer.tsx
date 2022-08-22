import {
  Badge,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  FormLabel,
  Heading,
  Image,
  Input,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { StarIcon } from "@chakra-ui/icons";
import { FilterDrawer } from "./FilterDrawer";

export const ChakraDrawer = ({ state, setState }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchState, setSearchState] = useState(state);

  const handleSearch = (e: any) => {
    e.preventDefault();
    const searchedState = searchState.filter((list: any) => {
      return (
        list.propertyMetadata.headline
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        list.propertyId.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    if (e.target.value === "") setState(searchState);
    setState(searchedState);
  };

  const handleDeleteButtonClick = (id: string) => {
    setState((prevState: any) => {
      return prevState.filter((item: any) => item.propertyId !== id);
    });
  };
  return (
    <Box m="1rem 0">
      <Button colorScheme="teal" onClick={onOpen}>
        Search Property
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody mt="2rem">
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="search" />
                <Input
                  id="search"
                  placeholder="Search by property id or title"
                  onChange={(e) => handleSearch(e)}
                />
              </Box>
            </Stack>
            <FilterDrawer state={state} setState={setState} />
            <Stack display="flex" alignItems="center" w="100%">
              {state.length ? (
                state.map((list: any, index: number) => {
                  return (
                    <Box
                      maxW="sm"
                      borderWidth="1px"
                      borderRadius="lg"
                      overflow="hidden"
                      key={index}
                    >
                      <Flex justifyContent="center">
                        <Image
                          src={list.images[0].c6_uri}
                          alt={list.images[0].altText}
                        />
                      </Flex>

                      <Box p="6">
                        <Box
                          mt="1"
                          fontWeight="semibold"
                          as="h6"
                          lineHeight="tight"
                        >
                          {list.propertyMetadata.headline}
                        </Box>

                        <Box as="span" color="gray.600" fontSize="sm">
                          {list.bathrooms.full} Ba | {list.bedrooms} Br |{" "}
                          {list.sleeps} Sleeps
                        </Box>
                        <Badge
                          borderRadius="full"
                          px="2"
                          colorScheme="teal"
                          mx="1rem"
                        >
                          {list.priceSummary.formattedAmount}
                        </Badge>
                        <Box display="flex" mt="2" alignItems="center">
                          {Array(5)
                            .fill("")
                            .map((_, i) => (
                              <StarIcon
                                key={i}
                                color={
                                  i < list.averageRating
                                    ? "teal.500"
                                    : "gray.300"
                                }
                              />
                            ))}
                          <Box as="span" ml="2" color="gray.600" fontSize="sm">
                            {list.reviewCount}{" "}
                            {list.reviewCount === 1 ? "review" : "reviews"}
                          </Box>
                          <Button
                            colorScheme="red"
                            ml="2rem"
                            onClick={() =>
                              handleDeleteButtonClick(list.propertyId)
                            }
                          >
                            Remove
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  );
                })
              ) : (
                <Heading as="h4" size="md" mt="2rem">
                  Oops! No properties match the selected filters
                </Heading>
              )}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
