import sinon from "sinon";
import { expect } from "chai";
import messageService from "./message.service";
import { Messages } from "../Models/message.model";
import { Message } from "../interfaces/message.interface";

describe("Message Service", function () {
  let findStub: sinon.SinonStub;
  let insertStub: sinon.SinonStub;

  beforeEach(function () {
    findStub = sinon.stub(Messages, "find").returns({
      fetch: () => [{ message: "Hi", handle: "testUser" }],
    } as any);
    insertStub = sinon.stub(Messages, "insert").returns("mockedId");
  });

  afterEach(function () {
    findStub.restore();
    insertStub.restore();
  });

  it("getAllMessages should retrieve messages correctly", function () {
    const messages = messageService.getAllMessages();
    expect(messages).to.deep.equal([{ message: "Hi", handle: "testUser" }]);
    sinon.assert.calledOnce(findStub);
  });

  it("addMessage should add a message correctly", function () {
    const mockMessage: Message = { message: "Hello", handle: "newUser" };
    const id = messageService.addMessage(mockMessage);
    expect(id).to.equal("mockedId");
    sinon.assert.calledWith(insertStub, mockMessage);
  });
});
