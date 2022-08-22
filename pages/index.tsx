import type { NextPage } from "next";
import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";
import { Badge, Box, Flex, Heading, Image } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE, POST_API } from "../constants";
import { ChakraDrawer } from "../components/ChakraDrawer";

const Home: NextPage = ({ fetchedData }: any) => {
  const [state, setState] = useState(fetchedData.data.results.listings);
  const mapLatitude =
    fetchedData.data.results.mapViewport.neLat ?? DEFAULT_LATITUDE;
  const mapLongitude =
    fetchedData.data.results.mapViewport.neLong ?? DEFAULT_LONGITUDE;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API ?? "",
  });
  if (!isLoaded) return <Box>Loading...</Box>;
  return (
    <Map
      lat={mapLatitude}
      lng={mapLongitude}
      state={state}
      setState={setState}
    />
  );
};

export interface MapProps {
  lat: number;
  lng: number;
  state: any;
  setState: any;
}

export const Map: FC<MapProps> = ({ lat, lng, state, setState }) => {
  const [selectedCenter, setSelectedCenter] = useState<any>(null);
  const [infoWindowToggle, setInfoWindowToggle] = useState<any>(false);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedCenter(null);
      }
    };
    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);
  return (
    <>
      <ChakraDrawer state={state} setState={setState} />
      <GoogleMap
        zoom={13}
        center={{ lat, lng }}
        mapContainerClassName="map-container"
      >
        {state.map((item: any, index: number) => (
          <MarkerF
            key={index}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 3,
              strokeWeight: 10,
              strokeColor: "blue",
            }}
            position={{
              lat: item.geoCode?.latitude,
              lng: item.geoCode?.longitude,
            }}
            onClick={() => {
              setSelectedCenter(item);
              setInfoWindowToggle(true);
            }}
          />
        ))}
        {infoWindowToggle ? (
          <InfoWindow
            onCloseClick={() => setInfoWindowToggle(false)}
            position={{
              lat: selectedCenter.geoCode.latitude,
              lng: selectedCenter.geoCode.longitude,
            }}
          >
            <Box>
              <Heading as="h6" size={"xs"} mb="1rem">
                {selectedCenter.propertyMetadata.headline}
              </Heading>
              <Flex justifyContent="center" h="150px" w="200px">
                <Image
                  src={selectedCenter.images[0].c6_uri}
                  alt={selectedCenter.images[0].altText}
                />
              </Flex>
              <Badge borderRadius="full" colorScheme="teal" mt="1rem">
                {selectedCenter.priceSummary.formattedAmount}
              </Badge>
            </Box>
          </InfoWindow>
        ) : (
          ""
        )}
      </GoogleMap>
    </>
  );
};

// fetch data from API
export const getStaticProps = async () => {
  const fetchData = async (api: string) => {
    const objectWithData = {
      operationName: "SearchRequestQuery",
      variables: {
        filterCounts: true,
        request: {
          paging: {
            page: 1,
            pageSize: 50,
          },
          filterVersion: "1",
          filters: [],
          coreFilters: {
            maxBathrooms: null,
            maxBedrooms: null,
            maxNightlyPrice: null,
            maxTotalPrice: null,
            minBathrooms: 0,
            minBedrooms: 0,
            minNightlyPrice: 0,
            minTotalPrice: null,
            pets: 0,
          },
          boundingBox: {
            maxLat: 48.864716,
            maxLng: 2.349014,
            minLat: 47.864716,
            minLng: 1.349014,
          },
          q: "chicago-illinois-united-states-of-america",
        },
        vrbo_web_global_messaging_alert: true,
        vrbo_web_global_messaging_banner: true,
        Vrbo_reco_large_search_destino: false,
      },
      extensions: {
        isPageLoadSearch: false,
      },
      query:
        'query SearchRequestQuery($request: SearchResultRequest!, $filterCounts: Boolean!, $vrbo_web_global_messaging_alert: Boolean!, $vrbo_web_global_messaging_banner: Boolean!, $Vrbo_reco_large_search_destino: Boolean!) {\n  results: search(request: $request) {\n    ...querySelectionSet\n    ...DestinationBreadcrumbsSearchResult\n    ...DestinationCarouselSearchResult @include(if: $Vrbo_reco_large_search_destino)\n    ...DestinationMessageSearchResult\n    ...FilterCountsSearchRequestResult\n    ...HitCollectionSearchResult\n    ...ADLSearchResult\n    ...MapSearchResult\n    ...ExpandedGroupsSearchResult\n    ...PagerSearchResult\n    ...SearchTermCarouselSearchResult\n    ...InternalToolsSearchResult\n    ...SEOMetaDataParamsSearchResult\n    ...GlobalInlineMessageSearchResult @include(if: $vrbo_web_global_messaging_alert)\n    ...GlobalBannerContainerSearchResult @include(if: $vrbo_web_global_messaging_banner)\n    ...FlexibleDatesSearchResult\n    __typename\n  }\n  ...RequestMarkerFragment\n}\n\nfragment querySelectionSet on SearchResult {\n  id\n  typeaheadSuggestion {\n    uuid\n    term\n    name\n    __typename\n  }\n  geography {\n    lbsId\n    gaiaId\n    location {\n      latitude\n      longitude\n      __typename\n    }\n    isGeocoded\n    shouldShowMapCentralPin\n    __typename\n  }\n  propertyRedirectUrl\n  __typename\n}\n\nfragment DestinationBreadcrumbsSearchResult on SearchResult {\n  destination {\n    breadcrumbs {\n      name\n      url\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment DestinationCarouselSearchResult on SearchResult {\n  destinationRecommendationResponse(size: 8, target: SERP_LARGE_SEARCH_TERM_DESTINATION) {\n    ...DestinationCarouselRecommendedDestinationResponse\n    __typename\n  }\n  __typename\n}\n\nfragment DestinationCarouselRecommendedDestinationResponse on RecommendedDestinationResponse {\n  clientRequestId\n  recommendedDestinations {\n    searchTermUuid\n    imageHref\n    recommendationModel\n    breadcrumbs {\n      place {\n        name {\n          simple\n          full\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment HitCollectionSearchResult on SearchResult {\n  page\n  pageSize\n  queryUUID\n  listings {\n    ...HitListing\n    __typename\n  }\n  pinnedListing {\n    headline\n    listing {\n      ...HitListing\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment HitListing on Listing {\n  virtualTourBadge {\n    name\n    id\n    helpText\n    __typename\n  }\n  amenitiesBadges {\n    name\n    id\n    helpText\n    __typename\n  }\n  multiUnitProperty\n  images {\n    altText\n    c6_uri\n    c9_uri\n    mab {\n      banditId\n      payloadId\n      campaignId\n      cached\n      arm {\n        level\n        imageUrl\n        categoryName\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  ...HitInfoListing\n  __typename\n}\n\nfragment HitInfoListing on Listing {\n  listingId\n  ...HitInfoDesktopListing\n  ...HitInfoMobileListing\n  ...PriceListing\n  __typename\n}\n\nfragment HitInfoDesktopListing on Listing {\n  detailPageUrl\n  instantBookable\n  minStayRange {\n    minStayHigh\n    minStayLow\n    __typename\n  }\n  listingId\n  rankedBadges(rankingStrategy: SERP) {\n    id\n    helpText\n    name\n    __typename\n  }\n  propertyId\n  propertyMetadata {\n    headline\n    __typename\n  }\n  superlativesBadges: rankedBadges(rankingStrategy: SERP_SUPERLATIVES) {\n    id\n    helpText\n    name\n    __typename\n  }\n  unitMetadata {\n    unitName\n    __typename\n  }\n  webRatingBadges: rankedBadges(rankingStrategy: SRP_WEB_RATING) {\n    id\n    helpText\n    name\n    __typename\n  }\n  ...DetailsListing\n  ...GeoDistanceListing\n  ...PriceListing\n  ...RatingListing\n  ...UrgencyMessageListing\n  ...MultiUnitHitListing\n  __typename\n}\n\nfragment DetailsListing on Listing {\n  bathrooms {\n    full\n    half\n    toiletOnly\n    __typename\n  }\n  bedrooms\n  propertyType\n  sleeps\n  petsAllowed\n  spaces {\n    spacesSummary {\n      area {\n        areaValue\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment GeoDistanceListing on Listing {\n  geoDistance {\n    text\n    relationType\n    __typename\n  }\n  __typename\n}\n\nfragment PriceListing on Listing {\n  priceSummary: priceSummary {\n    priceAccurate\n    ...PriceSummaryTravelerPriceSummary\n    __typename\n  }\n  priceSummarySecondary: priceSummary(summary: "displayPriceSecondary") {\n    ...PriceSummaryTravelerPriceSummary\n    __typename\n  }\n  priceLabel: priceSummary(summary: "priceLabel") {\n    priceTypeId\n    pricePeriodDescription\n    __typename\n  }\n  __typename\n}\n\nfragment PriceSummaryTravelerPriceSummary on TravelerPriceSummary {\n  priceTypeId\n  edapEventJson\n  formattedAmount\n  roundedFormattedAmount\n  pricePeriodDescription\n  __typename\n}\n\nfragment RatingListing on Listing {\n  averageRating\n  reviewCount\n  __typename\n}\n\nfragment UrgencyMessageListing on Listing {\n  unitMessage(assetVersion: 1) {\n    ...UnitMessageUnitMessage\n    __typename\n  }\n  __typename\n}\n\nfragment UnitMessageUnitMessage on UnitMessage {\n  iconText {\n    message\n    icon\n    messageValueType\n    __typename\n  }\n  __typename\n}\n\nfragment MultiUnitHitListing on Listing {\n  propertyMetadata {\n    propertyName\n    __typename\n  }\n  propertyType\n  listingId\n  ...MultiUnitDropdownListing\n  ...MultiUnitModalListing\n  __typename\n}\n\nfragment MultiUnitDropdownListing on Listing {\n  ...MultiUnitListWrapperListing\n  __typename\n}\n\nfragment MultiUnitListWrapperListing on Listing {\n  listingNamespace\n  listingNumber\n  __typename\n}\n\nfragment MultiUnitModalListing on Listing {\n  ...MultiUnitListWrapperListing\n  __typename\n}\n\nfragment HitInfoMobileListing on Listing {\n  detailPageUrl\n  instantBookable\n  minStayRange {\n    minStayHigh\n    minStayLow\n    __typename\n  }\n  listingId\n  rankedBadges(rankingStrategy: SERP) {\n    id\n    helpText\n    name\n    __typename\n  }\n  propertyId\n  propertyMetadata {\n    headline\n    __typename\n  }\n  superlativesBadges: rankedBadges(rankingStrategy: SERP_SUPERLATIVES) {\n    id\n    helpText\n    name\n    __typename\n  }\n  unitMetadata {\n    unitName\n    __typename\n  }\n  webRatingBadges: rankedBadges(rankingStrategy: SRP_WEB_RATING) {\n    id\n    helpText\n    name\n    __typename\n  }\n  ...DetailsListing\n  ...GeoDistanceListing\n  ...PriceListing\n  ...RatingListing\n  ...UrgencyMessageListing\n  ...MultiUnitHitListing\n  __typename\n}\n\nfragment ExpandedGroupsSearchResult on SearchResult {\n  expandedGroups {\n    ...ExpandedGroupExpandedGroup\n    __typename\n  }\n  __typename\n}\n\nfragment ExpandedGroupExpandedGroup on ExpandedGroup {\n  listings {\n    ...HitListing\n    ...MapHitListing\n    __typename\n  }\n  mapViewport {\n    neLat\n    neLong\n    swLat\n    swLong\n    __typename\n  }\n  __typename\n}\n\nfragment MapHitListing on Listing {\n  ...HitListing\n  geoCode {\n    latitude\n    longitude\n    __typename\n  }\n  __typename\n}\n\nfragment FilterCountsSearchRequestResult on SearchResult {\n  id\n  resultCount\n  filterGroups {\n    groupInfo {\n      name\n      id\n      __typename\n    }\n    filters {\n      count @include(if: $filterCounts)\n      checked\n      filter {\n        id\n        name\n        refineByQueryArgument\n        description\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment MapSearchResult on SearchResult {\n  mapViewport {\n    neLat\n    neLong\n    swLat\n    swLong\n    __typename\n  }\n  page\n  pageSize\n  listings {\n    ...MapHitListing\n    __typename\n  }\n  pinnedListing {\n    listing {\n      ...MapHitListing\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment PagerSearchResult on SearchResult {\n  fromRecord\n  toRecord\n  pageSize\n  pageCount\n  page\n  resultCount\n  __typename\n}\n\nfragment DestinationMessageSearchResult on SearchResult {\n  destinationMessage(assetVersion: 4) {\n    iconTitleText {\n      title\n      message\n      icon\n      messageValueType\n      link {\n        linkText\n        linkHref\n        __typename\n      }\n      __typename\n    }\n    ...DestinationMessageDestinationMessage\n    __typename\n  }\n  __typename\n}\n\nfragment DestinationMessageDestinationMessage on DestinationMessage {\n  iconText {\n    message\n    icon\n    messageValueType\n    __typename\n  }\n  __typename\n}\n\nfragment ADLSearchResult on SearchResult {\n  parsedParams {\n    q\n    coreFilters {\n      adults\n      children\n      pets\n      minBedrooms\n      maxBedrooms\n      minBathrooms\n      maxBathrooms\n      minNightlyPrice\n      maxNightlyPrice\n      minSleeps\n      __typename\n    }\n    dates {\n      arrivalDate\n      departureDate\n      __typename\n    }\n    sort\n    __typename\n  }\n  page\n  pageSize\n  pageCount\n  resultCount\n  fromRecord\n  toRecord\n  pinnedListing {\n    listing {\n      listingId\n      __typename\n    }\n    __typename\n  }\n  listings {\n    listingId\n    __typename\n  }\n  filterGroups {\n    filters {\n      checked\n      filter {\n        groupId\n        id\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  geography {\n    lbsId\n    name\n    description\n    location {\n      latitude\n      longitude\n      __typename\n    }\n    primaryGeoType\n    breadcrumbs {\n      name\n      countryCode\n      location {\n        latitude\n        longitude\n        __typename\n      }\n      primaryGeoType\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment RequestMarkerFragment on Query {\n  requestmarker\n  __typename\n}\n\nfragment SearchTermCarouselSearchResult on SearchResult {\n  discoveryXploreFeeds {\n    results {\n      id\n      title\n      items {\n        ... on SearchDiscoveryFeedItem {\n          type\n          imageHref\n          place {\n            uuid\n            name {\n              full\n              simple\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  typeaheadSuggestion {\n    name\n    __typename\n  }\n  __typename\n}\n\nfragment InternalToolsSearchResult on SearchResult {\n  internalTools {\n    searchServiceUrl\n    __typename\n  }\n  __typename\n}\n\nfragment SEOMetaDataParamsSearchResult on SearchResult {\n  page\n  resultCount\n  pageSize\n  geography {\n    name\n    lbsId\n    breadcrumbs {\n      name\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment GlobalInlineMessageSearchResult on SearchResult {\n  globalMessages {\n    ...GlobalInlineAlertGlobalMessages\n    __typename\n  }\n  __typename\n}\n\nfragment GlobalInlineAlertGlobalMessages on GlobalMessages {\n  alert {\n    action {\n      link {\n        href\n        text {\n          value\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    body {\n      text {\n        value\n        __typename\n      }\n      link {\n        href\n        text {\n          value\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    id\n    severity\n    title {\n      value\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment GlobalBannerContainerSearchResult on SearchResult {\n  globalMessages {\n    ...GlobalBannerGlobalMessages\n    __typename\n  }\n  __typename\n}\n\nfragment GlobalBannerGlobalMessages on GlobalMessages {\n  banner {\n    body {\n      text {\n        value\n        __typename\n      }\n      link {\n        href\n        text {\n          value\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    id\n    severity\n    title {\n      value\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment FlexibleDatesSearchResult on SearchResult {\n  percentBooked {\n    currentPercentBooked\n    __typename\n  }\n  __typename\n}\n',
    };
    try {
      const data = await fetch("https://www.vrbo.com/serp/g", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objectWithData),
      });
      return await data.json();
    } catch (error) {
      throw new Error("cannot fetch data, please retry");
    }
  };

  const fetchedData = await fetchData(POST_API);
  return {
    props: { fetchedData },
  };
};

export default Home;
