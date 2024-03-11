import { NewWeaponStore } from "../new_weapons";

const store = new NewWeaponStore();
describe("New Weapon Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });
  it("index method should return a list of products", async () => {
    const result = await store.index();
    expect(result).toEqual([{ name: 'test', type: 'a', weight: 1, id: 1 }]);
  });
});
