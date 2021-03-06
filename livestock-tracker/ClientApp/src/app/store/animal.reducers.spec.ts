import {
  animalsReducer,
  initialState as animalInitialState,
  AnimalState
} from './animal.reducers';
import {
  AddAnimal,
  SelectAnimal,
  SetAnimals,
  RemoveAnimalSucceeded,
  AddAnimalSucceeded
} from './animal.actions';
import { Livestock } from '../livestock/livestock.model';
import { LiveStockType } from '../livestock/livestock-type.model';

describe('animals reducer', () => {
  let initialState: AnimalState;

  beforeEach(() => {
    initialState = {
      ...animalInitialState,
      entities: { ...animalInitialState.entities },
      error: { ...animalInitialState.error },
      ids: (animalInitialState.ids || []).slice()
    };
  });

  it('should add another animal to the list when action is of type ADD_ANIMAL', () => {
    const animal1 = new Livestock(
      1,
      LiveStockType.Cattle,
      'fries',
      1,
      new Date(),
      new Date(),
      100,
      0,
      120,
      1
    );
    const addAnimalTask1 = new AddAnimalSucceeded(animal1);
    const state1 = animalsReducer(initialState, addAnimalTask1);
    expect(state1).not.toBe(null);
    expect(state1.entities[1]).toBeDefined();
    expect(state1.entities[1].id).toBe(animal1.id);
    expect(state1.entities[1].number).toBe(animal1.number);
    expect(state1.entities[1].arrivalWeight).toBe(animal1.arrivalWeight);
    expect(state1.entities[1].type).toBe(LiveStockType.Cattle);

    const animal2 = new Livestock(
      2,
      LiveStockType.Chicken,
      'black',
      2,
      new Date(),
      new Date(),
      20,
      0,
      1,
      2
    );
    const addAnimalTask2 = new AddAnimalSucceeded(animal2);

    const state2 = animalsReducer(state1, addAnimalTask2);
    expect(state2).not.toBe(null);
    expect(state2.entities[1]).toBeDefined();
    expect(state2.entities[1].id).toBe(animal1.id);
    expect(state2.entities[1].number).toBe(animal1.number);
    expect(state2.entities[1].arrivalWeight).toBe(animal1.arrivalWeight);
    expect(state2.entities[1].type).toBe(LiveStockType.Cattle);

    expect(state2.entities[2]).toBeDefined();
    expect(state2.entities[2].id).toBe(animal2.id);
    expect(state2.entities[2].number).toBe(animal2.number);
    expect(state2.entities[2].arrivalWeight).toBe(animal2.arrivalWeight);
    expect(state2.entities[2].type).toBe(LiveStockType.Chicken);

    const animal3 = new Livestock(
      3,
      LiveStockType.Pig,
      'fat',
      3,
      new Date(),
      new Date(),
      200,
      0,
      200,
      3
    );
    const addAnimalTask3 = new AddAnimalSucceeded(animal3);

    const state3 = animalsReducer(state2, addAnimalTask3);
    expect(state3).not.toBe(null);
    expect(state3.entities[1]).toBeDefined();
    expect(state3.entities[1].id).toBe(animal1.id);
    expect(state3.entities[1].number).toBe(animal1.number);
    expect(state3.entities[1].arrivalWeight).toBe(animal1.arrivalWeight);
    expect(state3.entities[1].type).toBe(LiveStockType.Cattle);

    expect(state3.entities[2]).toBeDefined();
    expect(state3.entities[2].id).toBe(animal2.id);
    expect(state3.entities[2].number).toBe(animal2.number);
    expect(state3.entities[2].arrivalWeight).toBe(animal2.arrivalWeight);
    expect(state3.entities[2].type).toBe(LiveStockType.Chicken);

    expect(state3.entities[3]).toBeDefined();
    expect(state3.entities[3].id).toBe(animal3.id);
    expect(state3.entities[3].number).toBe(animal3.number);
    expect(state3.entities[3].arrivalWeight).toBe(animal3.arrivalWeight);
    expect(state3.entities[3].type).toBe(LiveStockType.Pig);
  });

  it('should remove the animal with the provided key if the action is of type REMOVE_ANIMAL_SUCCESS', () => {
    const animal1 = new Livestock(
      1,
      LiveStockType.Cattle,
      'fries',
      1,
      new Date(),
      new Date(),
      100,
      0,
      120,
      1
    );
    const addAnimalTask1 = new AddAnimalSucceeded(animal1);
    const state1 = animalsReducer(initialState, addAnimalTask1);

    const animal2 = new Livestock(
      2,
      LiveStockType.Chicken,
      'black',
      2,
      new Date(),
      new Date(),
      20,
      0,
      1,
      2
    );
    const addAnimalTask2 = new AddAnimalSucceeded(animal2);
    const state2 = animalsReducer(state1, addAnimalTask2);

    const animal3 = new Livestock(
      3,
      LiveStockType.Pig,
      'fat',
      3,
      new Date(),
      new Date(),
      200,
      0,
      200,
      3
    );
    const addAnimalTask3 = new AddAnimalSucceeded(animal3);
    const state3 = animalsReducer(state2, addAnimalTask3);

    const removeAnimal2 = new RemoveAnimalSucceeded(2);
    const state4 = animalsReducer(state3, removeAnimal2);
    expect(state4.entities[2]).toBeUndefined();
    expect(state4.entities[1]).toBeDefined();
    expect(state4.entities[3]).toBeDefined();

    const removeAnimal1 = new RemoveAnimalSucceeded(1);
    removeAnimal1.key = 1;
    const state5 = animalsReducer(state4, removeAnimal1);
    expect(state5.entities[2]).toBeUndefined();
    expect(state5.entities[1]).toBeUndefined();
    expect(state5.entities[3]).toBeDefined();

    const removeAnimal3 = new RemoveAnimalSucceeded(3);
    const state6 = animalsReducer(state5, removeAnimal3);
    expect(state6.entities[2]).toBeUndefined();
    expect(state6.entities[1]).toBeUndefined();
    expect(state6.entities[3]).toBeUndefined();
  });

  it('should set selectedAnimal equal to the key of the action object when the type is of SELECT_ANIMAL', () => {
    expect(initialState.selectedAnimal).toEqual(null);

    const animal1 = new Livestock(
      1,
      LiveStockType.Cattle,
      'fries',
      1,
      new Date(),
      new Date(),
      100,
      0,
      120,
      1
    );
    const addAnimalTask1 = new AddAnimalSucceeded(animal1);
    const state1 = animalsReducer(initialState, addAnimalTask1);

    const animal2 = new Livestock(
      2,
      LiveStockType.Chicken,
      'black',
      2,
      new Date(),
      new Date(),
      20,
      0,
      1,
      2
    );
    const addAnimalTask2 = new AddAnimalSucceeded(animal2);
    const state2 = animalsReducer(state1, addAnimalTask2);

    const animal3 = new Livestock(
      3,
      LiveStockType.Pig,
      'fat',
      3,
      new Date(),
      new Date(),
      200,
      0,
      200,
      3
    );
    const addAnimalTask3 = new AddAnimalSucceeded(animal3);
    const state3 = animalsReducer(state2, addAnimalTask3);

    const selectAnimal2 = new SelectAnimal(2);
    const state4 = animalsReducer(state3, selectAnimal2);
    expect(state4.selectedAnimal).toEqual(2);

    const selectAnimal3 = new SelectAnimal(3);
    const state5 = animalsReducer(state4, selectAnimal3);
    expect(state5.selectedAnimal).toEqual(3);
  });

  it('should clear animals and set them to the key value object matching array passed in if the action type is SET_ANIMALS', () => {
    const animal1 = new Livestock(
      1,
      LiveStockType.Cattle,
      'fries',
      1,
      new Date(),
      new Date(),
      100,
      0,
      120,
      1
    );
    const animal2 = new Livestock(
      2,
      LiveStockType.Chicken,
      'black',
      2,
      new Date(),
      new Date(),
      20,
      0,
      1,
      2
    );
    const animal3 = new Livestock(
      3,
      LiveStockType.Pig,
      'fat',
      3,
      new Date(),
      new Date(),
      200,
      0,
      200,
      3
    );
    const setAnimals1 = new SetAnimals([animal1, animal2, animal3]);
    const state1 = animalsReducer(initialState, setAnimals1);
    expect(state1.entities).toBeDefined();
    expect(state1.entities).not.toBeNull();
    expect(state1.entities[1]).toBeDefined();
    expect(state1.entities[2]).toBeDefined();
    expect(state1.entities[3]).toBeDefined();
    expect(state1.entities[1].type).toBe(LiveStockType.Cattle);
    expect(state1.entities[2].type).toBe(LiveStockType.Chicken);
    expect(state1.entities[3].type).toBe(LiveStockType.Pig);
  });
});
