import { describe, it, expect, jest } from "@jest/globals";
import Person from "../src/person.js";

describe("#Person Suite", () => {
  describe("#validade", () => {
    it("should throw if the name is not present", () => {
      // mock é a entrada necessária para que o teste funcione
      const mockInvalidPerson = {
        name: "",
        cpf: "123.456.789-00",
      };
      expect(() => Person.validate(mockInvalidPerson)).toThrow(
        new Error("name is required")
      );
    });
    it("should throw if the cpf is not present", () => {
      // mock é a entrada necessária para que o teste funcione
      const mockInvalidPerson = {
        name: "Xuxa da Silva",
        cpf: "",
      };
      expect(() => Person.validate(mockInvalidPerson)).toThrow(
        new Error("cpf is required")
      );
    });
    it("should not throw if person is valid", () => {
      // mock é a entrada necessária para que o teste funcione
      const mockInvalidPerson = {
        name: "Xuxa da Silva",
        cpf: "123.456.789-00",
      };
      expect(() => Person.validate(mockInvalidPerson)).not.toThrow();
    });
  });

  describe("#format", () => {
    // parte do principio que os dados já foram validados!
    it("should format the person name and cpf", () => {
      //AAA

      // Arrange = Prepara
      const mockPerson = {
        name: "Xuxa da Silva",
        cpf: "123.456.789-00",
      };

      // Act = Excecutar
      const formattedPerson = Person.format(mockPerson);

      // Assert = Validar
      const expected = {
        name: "Xuxa",
        cpf: "12345678900",
        lastName: "da Silva",
      };

      expect(formattedPerson).toStrictEqual(expected);
    });
  });

  describe("#process", () => {
    it("should process a valid person", () => {
      // AAA = Arrange , Act, Assert

      //Arrange
      const mockPerson = {
        name: "Zezin da Silva",
        cpf: "999.999.999-99",
      };

      jest.spyOn(Person, Person.validate.name).mockReturnValue();
      // .mockImplementation(() => {
      //   throw new Error("Deu ruim!");
      // });

      jest.spyOn(Person, Person.format.name).mockReturnValue({
        cpf: "123.45678900",
        name: "Zezin",
        lastName: "da Silva",
      });

      // Act
      const result = Person.process(mockPerson);

      // Assert
      const expected = "ok";
      expect(result).toStrictEqual(expected);
    });
  });
});
