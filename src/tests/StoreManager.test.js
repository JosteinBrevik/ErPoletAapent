// Import `shallowMount` from Vue Test Utils and the component being tested
import { shallowMount } from "@vue/test-utils";
import StoreManager from "../components/StoreManager.vue";

// Mount the component
const wrapper = shallowMount(StoreManager);

// Here are some Jest tests, though you can
// use any test runner/assertion library combo you prefer
describe("StoreManager", () => {
  // Inspect the raw component options
  it("exists", () => {
    expect(!StoreManager).toBe(false);
  });
});
