import {
  Box,
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  Heading,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { StarIcon } from "@chakra-ui/icons";
import {
  filtersHeader,
  MAX_BATHROOM_VALUE,
  MAX_BEDROOM_VALUE,
  MAX_SLEEP_VALUE,
  MIN_BATHROOM_VALUE,
  MIN_BEDROOM_VALUE,
  MIN_SLEEP_VALUE,
} from "../constants";

export const FilterDrawer = ({ state, setState }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState(state);
  const [filters, setFilters] = useState(filtersHeader);
  const [minBedroomQuantity, setMinBedroomQuantity] =
    useState(MIN_BEDROOM_VALUE);
  const [maxBedroomQuantity, setMaxBedroomQuantity] =
    useState(MAX_BEDROOM_VALUE);
  const [minBathroomQuantity, setMinBathroomQuantity] =
    useState(MIN_BATHROOM_VALUE);
  const [maxBathroomQuantity, setMaxBathroomQuantity] =
    useState(MAX_BATHROOM_VALUE);
  const [minSleepQuantity, setMinSleepQuantity] = useState(MIN_SLEEP_VALUE);
  const [maxSleepQuantity, setMaxSleepQuantity] = useState(MAX_SLEEP_VALUE);
  const [checkedFiveStar, setCheckedFiveStar] = useState(false);
  const [checkedFourStar, setCheckedFourStar] = useState(false);
  const [checkedZeroStar, setCheckedZeroStar] = useState(false);

  const handleQuantityDeleteUtils = (
    setState: (arg0: (prevState: any) => any) => void
  ) => {
    setState((prevState) => {
      if (prevState >= 1) return prevState - 1;
      else return prevState;
    });
  };

  const handleQuantityAddUtuils = (
    setState: (arg0: (prevState: any) => any) => void,
    maxValue: number
  ) => {
    setState((prevState: any) => {
      if (prevState < maxValue) return prevState + 1;
      else return prevState;
    });
  };

  const handleResetClick = () => {
    setMinBedroomQuantity(MIN_BEDROOM_VALUE);
    setMaxBedroomQuantity(MAX_BEDROOM_VALUE);
    setMinBathroomQuantity(MIN_BATHROOM_VALUE);
    setMaxBathroomQuantity(MAX_BATHROOM_VALUE);
    setMinSleepQuantity(MIN_SLEEP_VALUE);
    setMaxSleepQuantity(MAX_SLEEP_VALUE);
    setCheckedFiveStar(false);
    setCheckedFourStar(false);
    setCheckedZeroStar(false);
    setState(data);
  };

  const handleApplyClick = () => {
    setFilters([
      {
        filter: "Bedrooms",
        minQuantity: minBedroomQuantity,
        maxQuantity: maxBedroomQuantity,
        star5: false,
        star4: false,
        star0: false,
      },
      {
        filter: "Bathrooms",
        minQuantity: minBathroomQuantity,
        maxQuantity: maxBathroomQuantity,
        star5: false,
        star4: false,
        star0: false,
      },
      {
        filter: "Sleeps",
        minQuantity: minSleepQuantity,
        maxQuantity: maxSleepQuantity,
        star5: false,
        star4: false,
        star0: false,
      },
    ]);
    onClose();
  };

  useEffect(() => {
    setState((prevState: any) =>
      prevState.map((item: any) => {
        return { ...item, filters };
      })
    );
    const filteredState = state.filter((item: any) => {
      return (
        item.bathrooms.full >= minBathroomQuantity &&
        item.bathrooms.full <= maxBathroomQuantity &&
        item.bedrooms >= minBedroomQuantity &&
        item.bedrooms <= maxBedroomQuantity &&
        item.sleeps >= minSleepQuantity &&
        item.sleeps <= maxSleepQuantity &&
        (filters[0].star5 && checkedFiveStar
          ? item.averageRating === 5
          : true) &&
        (filters[0].star4 && checkedFourStar
          ? item.averageRating >= 4
          : true) &&
        (filters[0].star0 && checkedZeroStar ? item.averageRating >= 0 : true)
      );
    });
    setState(filteredState);
  }, [filters]);

  const handleFilterButtonClick = () => {
    onOpen();
    setMinBedroomQuantity(MIN_BEDROOM_VALUE);
    setMaxBedroomQuantity(MAX_BEDROOM_VALUE);
    setMinBathroomQuantity(MIN_BATHROOM_VALUE);
    setMaxBathroomQuantity(MAX_BATHROOM_VALUE);
    setMinSleepQuantity(MIN_SLEEP_VALUE);
    setMaxSleepQuantity(MAX_SLEEP_VALUE);
    setCheckedFiveStar(false);
    setCheckedFourStar(false);
    setCheckedZeroStar(false);
    setState(data);
  };

  const handleCheckBoxClick = (e) => {
    if (e.target.value === "5 stars") {
      setCheckedFiveStar(true);
    } else if (e.target.value === "4 stars") {
      setCheckedFourStar(true);
    } else if (e.target.value === "0 stars") {
      setCheckedZeroStar(true);
    }
    if (e.target.checked) {
      setFilters((prevState) =>
        prevState.map((item) => {
          return {
            ...item,
            star5: e.target.value === "5 stars",
            star4: e.target.value === "4 stars",
            star0: e.target.value === "0 stars",
          };
        })
      );
    } else {
      if (e.target.value === "5 stars") {
        setCheckedFiveStar(false);
      } else if (e.target.value === "4 stars") {
        setCheckedFourStar(false);
      } else if (e.target.value === "0 stars") {
        setCheckedZeroStar(false);
      }
      setFilters((prevState) =>
        prevState.map((item) => {
          return {
            ...item,
            star5: e.target.value === "5 stars" && e.target.checked,
            star4: e.target.value === "4 stars" && e.target.checked,
            star0: e.target.value === "0 stars" && e.target.checked,
          };
        })
      );
    }
  };

  return (
    <>
      <Button
        colorScheme="blue"
        onClick={handleFilterButtonClick}
        m="1rem 0"
        w="100%"
      >
        Filter
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody>
            <Stack mt="2rem">
              <Heading as="h4" size="sm">
                Bedrooms
              </Heading>
              <Flex
                dir="row"
                justifyContent="center"
                alignItems="center"
                mt="1.5rem"
                w="100%"
              >
                <Box m="1rem 0">{minBedroomQuantity}</Box>
                <Text mx="1rem">Min Bedrooms</Text>
                <Button
                  mx="0.5rem"
                  onClick={() =>
                    handleQuantityDeleteUtils(setMinBedroomQuantity)
                  }
                  disabled={minBedroomQuantity === MIN_BEDROOM_VALUE}
                >
                  -
                </Button>
                <Button
                  onClick={() =>
                    handleQuantityAddUtuils(
                      setMinBedroomQuantity,
                      MAX_BEDROOM_VALUE
                    )
                  }
                  disabled={minBedroomQuantity >= MAX_BEDROOM_VALUE}
                >
                  +
                </Button>
              </Flex>
              <Flex
                dir="row"
                justifyContent="center"
                alignItems="center"
                mt="1.5rem"
                w="100%"
              >
                <Box m="1rem 0">{maxBedroomQuantity}</Box>
                <Text mx="1rem">Max Bedrooms</Text>
                <Button
                  mx="0.5rem"
                  onClick={() =>
                    handleQuantityDeleteUtils(setMaxBedroomQuantity)
                  }
                  disabled={maxBedroomQuantity === MIN_BEDROOM_VALUE}
                >
                  -
                </Button>
                <Button
                  onClick={() =>
                    handleQuantityAddUtuils(
                      setMaxBedroomQuantity,
                      MAX_BEDROOM_VALUE
                    )
                  }
                  disabled={maxBedroomQuantity >= MAX_BEDROOM_VALUE}
                >
                  +
                </Button>
              </Flex>
            </Stack>

            <Stack mt="2rem">
              <Heading as="h4" size="sm">
                Bathrooms
              </Heading>
              <Flex
                dir="row"
                justifyContent="center"
                alignItems="center"
                mt="1.5rem"
                w="100%"
              >
                <Box m="1rem 0">{minBathroomQuantity}</Box>
                <Text mx="1rem">Min Bathrooms</Text>
                <Button
                  mx="0.5rem"
                  onClick={() =>
                    handleQuantityDeleteUtils(setMinBathroomQuantity)
                  }
                  disabled={minBathroomQuantity === MIN_BATHROOM_VALUE}
                >
                  -
                </Button>
                <Button
                  onClick={() =>
                    handleQuantityAddUtuils(
                      setMinBathroomQuantity,
                      MAX_BATHROOM_VALUE
                    )
                  }
                  disabled={minBathroomQuantity >= MAX_BATHROOM_VALUE}
                >
                  +
                </Button>
              </Flex>
              <Flex
                dir="row"
                justifyContent="center"
                alignItems="center"
                mt="1.5rem"
                w="100%"
              >
                <Box m="1rem 0">{maxBathroomQuantity}</Box>
                <Text mx="1rem">Max Bathrooms</Text>
                <Button
                  mx="0.5rem"
                  onClick={() =>
                    handleQuantityDeleteUtils(setMaxBathroomQuantity)
                  }
                  disabled={maxBathroomQuantity === MIN_BATHROOM_VALUE}
                >
                  -
                </Button>
                <Button
                  onClick={() =>
                    handleQuantityAddUtuils(
                      setMaxBathroomQuantity,
                      MAX_BATHROOM_VALUE
                    )
                  }
                  disabled={maxBathroomQuantity >= MAX_BATHROOM_VALUE}
                >
                  +
                </Button>
              </Flex>
            </Stack>

            <Stack mt="2rem">
              <Heading as="h4" size="sm">
                Sleeps
              </Heading>
              <Flex
                dir="row"
                justifyContent="center"
                alignItems="center"
                mt="1.5rem"
                w="100%"
              >
                <Box m="1rem 0">{minSleepQuantity}</Box>
                <Text mx="1rem">Min Sleeps</Text>
                <Button
                  mx="0.5rem"
                  onClick={() => handleQuantityDeleteUtils(setMinSleepQuantity)}
                  disabled={minSleepQuantity === MIN_SLEEP_VALUE}
                >
                  -
                </Button>
                <Button
                  onClick={() =>
                    handleQuantityAddUtuils(
                      setMinSleepQuantity,
                      MAX_SLEEP_VALUE
                    )
                  }
                  disabled={minSleepQuantity >= MAX_SLEEP_VALUE}
                >
                  +
                </Button>
              </Flex>
              <Flex
                dir="row"
                justifyContent="center"
                alignItems="center"
                mt="1.5rem"
                w="100%"
              >
                <Box m="1rem 0">{maxSleepQuantity}</Box>
                <Text mx="1rem">Max Sleeps</Text>
                <Button
                  mx="0.5rem"
                  onClick={() => handleQuantityDeleteUtils(setMaxSleepQuantity)}
                  disabled={maxSleepQuantity === MIN_SLEEP_VALUE}
                >
                  -
                </Button>
                <Button
                  onClick={() =>
                    handleQuantityAddUtuils(
                      setMaxSleepQuantity,
                      MAX_SLEEP_VALUE
                    )
                  }
                  disabled={maxSleepQuantity >= MAX_SLEEP_VALUE}
                >
                  +
                </Button>
              </Flex>
            </Stack>

            <Stack mt="2rem">
              <Heading as="h4" size="sm" mb="1rem">
                Property Reviews
              </Heading>
              <Checkbox
                value="5 stars"
                colorScheme="green"
                onChange={(e) => handleCheckBoxClick(e)}
                isChecked={checkedFiveStar}
              >
                {Array(5)
                  .fill("")
                  .map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                {"  "}
                5+ Stars
              </Checkbox>
              <Checkbox
                colorScheme="green"
                value="4 stars"
                onChange={(e) => handleCheckBoxClick(e)}
                isChecked={checkedFourStar}
              >
                {" "}
                {Array(4)
                  .fill("")
                  .map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                <StarIcon color="#D3D3D3" /> 4+ Stars
              </Checkbox>
              <Checkbox
                colorScheme="green"
                value="0 stars"
                onChange={(e) => handleCheckBoxClick(e)}
                isChecked={checkedZeroStar}
              >
                {Array(5)
                  .fill("")
                  .map((_, i) => (
                    <StarIcon key={i} color="#D3D3D3" />
                  ))}
                {"  "}
                0+ Stars
              </Checkbox>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={handleApplyClick}>
              Apply
            </Button>
            <Button colorScheme="red" onClick={handleResetClick}>
              Reset
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
