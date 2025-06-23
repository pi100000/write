import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { createWriteDto } from "dto/create-write.dto";
import { Write } from "./models/write.model";

describe("AppController", () => {
  let controller: AppController;
  let service: AppService;

  const mockWrite: Write = {
    id: 1,
    title: "Test Write",
    content: "Test content",
    tags: ["test", "example"],
  };

  const mockCreateDto: createWriteDto = {
    title: "New Write",
    content: "New content",
    tags: ["new", "test"],
  };

  describe("create", () => {
    it("should create and return a new write", async () => {
      jest.spyOn(service, "create").mockResolvedValue(mockWrite);

      const result = await controller.create(mockCreateDto);

      expect(result).toEqual(mockWrite);
      expect(service.create).toHaveBeenCalledWith(mockCreateDto);
    });
  });
});
