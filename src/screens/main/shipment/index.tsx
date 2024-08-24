import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, useTheme } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/reducers/userSlice";
import ShipLogo from "@/images/svgs/ship-logo.svg";
import Box from "@/images/svgs/box.svg";
import AppIcons from "@/images/icons/icons";
import BottomSheet from "@/components/RBSheet";
import Button from "@/components/Button";
import Header from "@/components/Header";
import ScrollContainer from "@/components/ScrollContainer";
import CustomInput from "@/components/CustomInput";
import TagItem from "@/components/TagItem";
import { useGetShipmentsMutation } from "@/service/appApi";
import DashedLine from "@/components/DashLine";

const SelectableItem = React.memo(
  ({
    item,
    isSelected,
    onSelectItem,
    theme,
  }: {
    item: any;
    isSelected: boolean;
    onSelectItem: (item: string) => void;
    theme: any;
  }) => {
    return (
      <TouchableOpacity
        onPress={() => onSelectItem(item)}
        style={[
          styles.item,
          {
            backgroundColor: theme.colors.backdrop,
            borderColor: isSelected
              ? theme.colors.inversePrimary
              : "transparent",
            borderWidth: 2,
          },
        ]}
      >
        <Text style={styles.text}>{item}</Text>
      </TouchableOpacity>
    );
  }
);

// a shipment component to render the shipment data, memo was used to avoid rerendering and for performance
const ShipmentItem = React.memo(
  ({
    item,
    theme,
    isSelected,
    onSelectItem,
    expand,
    toggleExpand,
  }: {
    item: any;
    theme: any;
    isSelected: boolean;
    onSelectItem: (item: string) => void;
    expand: boolean;
    toggleExpand: () => void;
  }) => {
    return (
      <View
        style={{ ...styles.listCon, backgroundColor: theme.colors.backdrop }}
      >
        <View style={[styles.listItem]}>
          <TouchableOpacity onPress={() => onSelectItem(item.name)}>
            <AppIcons
              name={isSelected ? "checkbox-tick" : "checkbox-outline"}
            />
          </TouchableOpacity>
          <Box />
          <View>
            <Text>AWB</Text>
            <Text style={{ fontFamily: "interBold" }}>{item.name}</Text>
            <View style={styles.listItemCon}>
              <Text>{item.origin_state}</Text>
              <AppIcons size={6.67} name="fwd-arrow" />
              <Text>{item.origin_zone}</Text>
            </View>
          </View>

          {/* The status should explicitly be RECEIVED, DELIEVERED, CANCELLED etc, I am just using item.status checker for testing purpose */}
          <TagItem
            style={{
              backgroundColor:
                item.status === "New ShipmentTT" ? "#CCC" : "#E3FAD6",
            }}
            title={item.status === "New ShipmentTT" ? "RECEIVED" : "DELIVERED"}
          />
          <TouchableOpacity onPress={toggleExpand}>
            <AppIcons name={!expand ? "arrow-expand" : "active-expand"} />
          </TouchableOpacity>
        </View>
        {expand && (
          <>
            <DashedLine />
            <View style={styles.originCon}>
              <View>
                <Text style={{ ...styles.oText, color: theme.colors.primary }}>
                  Origin
                </Text>
                <Text style={{ fontFamily: "interMedium" }}>
                  {item.origin_state}
                </Text>
                <View style={styles.listItemCon}>
                  <Text>{item.sender_address}</Text>
                </View>
              </View>
              <AppIcons name="fwd-arrow" size={24} />

              <View>
                <Text style={{ ...styles.oText, color: theme.colors.primary }}>
                  Destination
                </Text>
                <Text style={{ fontFamily: "interMedium" }}>
                  {item.destination_state}
                </Text>
                <View style={styles.listItemCon}>
                  <Text>{item.destination_address_line_1}</Text>
                </View>
              </View>
            </View>
            <View style={{ ...styles.btnCon }}>
              <Button
                leftIcon={<AppIcons name="call" />}
                variant="solid"
                type="disabled"
                style={{ ...styles.btn, width: "30%" }}
                title="Call"
              />
              <Button
                leftIcon={<AppIcons name="wapp" />}
                variant="solid"
                type="tertiary"
                style={{ ...styles.btn }}
                title="WhatsApp"
              />
            </View>
          </>
        )}
      </View>
    );
  }
);

export default function ShipmentScreen() {
  const theme = useTheme();
  const { user } = useAppSelector((state) => state.user);
  const refRBSheet = useRef<any>([]);
  const dispatch = useAppDispatch();

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [getShipment, { data, isLoading, isError, error, status }] =
    useGetShipmentsMutation();

  const [refreshing, setRefreshing] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [selectedShipItems, setSelectedShipItems] = useState<string[]>([]);
  const [expandedItems, setExpandedItems] = useState<{
    [key: string]: boolean;
  }>({});

  // func to expand shipment item to see more details
  const handleToggleExpand = useCallback((itemName: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  }, []);

  // func to select shipment item, can be multiple selection
  const handleSelectShipment = useCallback(
    (item: string) => {
      setSelectedShipItems((prevSelected) => {
        const isSelected = prevSelected.includes(item);
        const newSelected = isSelected
          ? prevSelected.filter((selectedItem) => selectedItem !== item)
          : [...prevSelected, item];

        if (newSelected.length === data?.message.length) {
          setIsAllSelected(true);
        } else {
          setIsAllSelected(false);
        }

        return newSelected;
      });
    },
    [data]
  );

  // func to select all shipments
  const toggleSelectAll = useCallback(() => {
    if (isAllSelected) {
      setSelectedShipItems([]);
      setIsAllSelected(false);
    } else {
      const allItems = data?.message.map((item) => item.name) || [];
      setSelectedShipItems(allItems);
      setIsAllSelected(true);
    }
  }, [data, isAllSelected]);

  //  refetch the data from the server
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // handles filter based on RECEIEVD< CANCELED, DELIVERED etc
  const onClickFilter = useCallback(() => {
    refRBSheet?.current[0]?.open();
  }, []);

  const onCancel = useCallback(() => {
    setSelectedItems([]);
    refRBSheet?.current[0]?.close();
  }, []);

  // finish filter selection and close sheet
  const onDone = useCallback(() => {
    refRBSheet?.current[0]?.close();
  }, []);

  // handles the selection of filter items
  const handleSelectItem = useCallback((item: string) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(item)) {
        return prevSelected.filter((selectedItem) => selectedItem !== item);
      } else {
        return [...prevSelected, item];
      }
    });
  }, []);

  // opens the sheet to logout
  const openLogoutSheet = useCallback(() => {
    refRBSheet?.current[1]?.open();
  }, []);

  const cancelLogout = useCallback(() => {
    refRBSheet?.current[1]?.close();
  }, []);

  // logs the user out
  const handleLogout = useCallback(() => {
    dispatch(logout());
    refRBSheet?.current[1]?.close();
  }, [dispatch]);

  // When the component mounts, this handle fetching the shipment, refetch when there is pull to refresh
  useEffect(() => {
    let queryData = {
      doctype: "AWB",
      fields: ["*"],
    };
    async function fetchShipments() {
      try {
        await getShipment(queryData).unwrap();
      } catch (error) {
        console.error(error);
      }
    }

    fetchShipments();
  }, [refreshing, getShipment]);

  // render the filter item in a sheet
  const renderFilterItem = ({ item }) => (
    <SelectableItem
      item={item}
      isSelected={selectedItems.includes(item)}
      onSelectItem={handleSelectItem}
      theme={theme}
    />
  );

  return (
    <ScrollContainer
      disableScroll
      header={
        <Header
          left={
            <View style={styles.row}>
              <Pressable onPress={openLogoutSheet}>
                <Avatar.Text
                  size={40}
                  label={user.full_name?.slice(0, 2)}
                  style={{
                    ...styles.avatar,
                    backgroundColor: theme.colors.primary,
                  }}
                  labelStyle={{
                    ...styles.labelStyle,
                    color: theme.colors.secondary,
                  }}
                />
              </Pressable>
              <ShipLogo style={styles.logo} />
            </View>
          }
          right={
            <View
              style={{
                ...styles.iconCon,
                backgroundColor: theme.colors.backdrop,
              }}
            >
              <AppIcons name="bell" />
            </View>
          }
        />
      }
    >
      <Text>Hello,</Text>
      <Text style={styles.nameText}>{user?.full_name}</Text>

      <CustomInput
        value={inputText}
        onChangeText={setInputText}
        rightIcon={
          <Pressable onPress={() => setInputText("")}>
            {inputText && <AppIcons name="cancel" />}
          </Pressable>
        }
        outerContainerStyle={styles.input}
        placeholder="Search"
        leftIcon={<AppIcons name="search" />}
      />
      <View style={styles.con}>
        <TouchableOpacity
          onPress={onClickFilter}
          style={{
            ...styles.filterBtn,
            backgroundColor: theme.colors.backdrop,
          }}
        >
          <AppIcons name="filter" />
          <Text>Filters</Text>
        </TouchableOpacity>
        <Button
          style={styles.scanBtn}
          title="Add Scan"
          leftIcon={<AppIcons name="scan-b" />}
        />
      </View>

      <View style={styles.itemRow}>
        <Text style={styles.title}>Shipments</Text>
        <TouchableOpacity style={styles.markCon} onPress={toggleSelectAll}>
          <AppIcons
            name={isAllSelected ? "checkbox-tick" : "checkbox-outline"}
          />
          <Text style={{ ...styles.markText, color: theme.colors.primary }}>
            {isAllSelected ? "Unmark All" : "Mark All"}
          </Text>
        </TouchableOpacity>
      </View>

      {isLoading && !refreshing && (
        <ActivityIndicator color={theme.colors.primary} />
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data?.message}
        renderItem={({ item }) => (
          <ShipmentItem
            expand={!!expandedItems?.[item?.name]}
            toggleExpand={() => handleToggleExpand(item.name)}
            isSelected={selectedShipItems.includes(item.name)}
            onSelectItem={handleSelectShipment}
            item={item}
            theme={theme}
          />
        )}
        keyExtractor={(item) => item.name}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />

      <BottomSheet
        otherStyles={styles.otherStyles}
        height={282}
        refRBSheet={(ref: any) => (refRBSheet.current[0] = ref)}
        closeOnPressMask={false}
      >
        <View style={styles.sheetCon}>
          <View style={styles.sheetMenu}>
            <TouchableOpacity onPress={onCancel}>
              <Text style={{ ...styles.cancel, color: theme.colors.primary }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <View>
              <Text style={{ ...styles.filterText }}>Filters</Text>
            </View>
            <TouchableOpacity onPress={onDone}>
              <Text style={{ ...styles.cancel, color: theme.colors.primary }}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{ ...styles.divider, backgroundColor: theme.colors.outline }}
          />
          <View style={styles.items}>
            <Text style={styles.shipText}>SHIPMENT STATUS</Text>
            <FlatList
              numColumns={3}
              data={[
                "Recieved",
                "Putaway",
                "Delivered",
                "Canceled",
                "Rejected",
                "Lost",
              ]}
              renderItem={renderFilterItem}
              keyExtractor={(item) => item.toString()}
              ListEmptyComponent={() => (
                <View>
                  <Text>Empty List, Pull to refresh</Text>
                </View>
              )}
            />
          </View>
        </View>
      </BottomSheet>

      <BottomSheet
        otherStyles={styles.otherStyles}
        height={202}
        refRBSheet={(ref: any) => (refRBSheet.current[1] = ref)}
        closeOnPressMask={false}
      >
        <View style={styles.sheetCon}>
          <Text style={styles.warnText}>Are you sure you want to Logout</Text>
          <View style={styles.btns}>
            <Button
              onPress={cancelLogout}
              variant="outline"
              style={styles.btn}
              title="Cancel"
            />
            <Button
              onPress={handleLogout}
              type="danger"
              style={styles.btn}
              title="Logout"
            />
          </View>
        </View>
      </BottomSheet>
    </ScrollContainer>
  );
}

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 10,
    textTransform: "uppercase",
  },
  avatar: { marginLeft: 24 },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: { marginLeft: "40%" },
  iconCon: {
    width: 40,
    height: 40,
    borderRadius: 80,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 24,
  },
  nameText: {
    fontFamily: "interMedium",
    fontSize: 28,
    marginVertical: 8,
  },
  input: {
    marginVertical: 8,
  },
  filterBtn: {
    padding: 8,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    flexDirection: "row",
    height: 48,
    width: 173,
  },
  con: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
    gap: 8,
  },
  scanBtn: { paddingHorizontal: 16, width: 173 },
  sheetMenu: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  cancel: {
    fontSize: 16,
    fontFamily: "interMedium",
  },
  filterText: {
    fontSize: 18,
    fontFamily: "interBold",
  },
  sheetCon: {
    marginTop: 10,
  },
  divider: {
    width: "100%",
    height: 1,
    marginVertical: 20,
  },
  otherStyles: { paddingHorizontal: 0 },
  items: {
    paddingHorizontal: 24,
  },
  shipText: {
    color: "#58536E",
    fontFamily: "interMedium",
    marginBottom: 8,
  },
  item: {
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginRight: 16,
    marginVertical: 8,
  },
  text: {
    fontSize: 16,
  },
  warnText: {
    fontFamily: "interMedium",
    textAlign: "center",
    fontSize: 16,
  },
  btns: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    alignSelf: "center",
    marginTop: 24,
  },
  btn: { width: "40%" },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  markCon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  title: {
    fontSize: 22,
    fontFamily: "interBold",
  },
  markText: {
    fontSize: 18,
    fontFamily: "interMedium",
  },
  listItem: {
    alignItems: "center",
    // gap: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listItemCon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  listCon: { padding: 10, borderRadius: 10, marginVertical: 8 },
  oText: { fontSize: 11 },
  originCon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btnCon: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    gap: 16,
    // justifyContent: "flex-end",
  },
});
