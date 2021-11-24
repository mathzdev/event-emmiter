import { EventEmitter } from "./event-emitter";

describe("event-listener", () => {
  it("should listen events given a eventName and a callback function", () => {
    const eventName = "my-event";
    const mockListener = jest.fn(() => {});

    EventEmitter.listen(eventName, mockListener);
    EventEmitter.emit(eventName);
    EventEmitter.emit(eventName);

    expect(mockListener).toBeCalledTimes(2);
  });

  it("should be able to listen to multiple events", () => {
    const eventNameA = "my-event-a";
    const mockListenerA = jest.fn(() => {});

    EventEmitter.listen(eventNameA, mockListenerA);
    EventEmitter.emit(eventNameA);

    const eventNameB = "my-event-b";
    const mockListenerB = jest.fn(() => {});

    EventEmitter.listen(eventNameB, mockListenerB);
    EventEmitter.emit(eventNameB);

    expect(mockListenerA).toBeCalledTimes(1);
    expect(mockListenerB).toBeCalledTimes(1);
  });

  it("should be able to add multiple listeners to the same event", () => {
    const eventNameA = "my-event-a";

    const mockListenerA = jest.fn(() => {});
    const mockListenerB = jest.fn(() => {});

    EventEmitter.listen(eventNameA, mockListenerA);
    EventEmitter.listen(eventNameA, mockListenerB);

    EventEmitter.emit(eventNameA);

    expect(mockListenerA).toBeCalledTimes(1);
    expect(mockListenerB).toBeCalledTimes(1);
  });

  it("should be able to pass data to listeners when emitting events", () => {
    const eventNameA = "my-event-a";
    const data = { foo: "bar" };

    const mockListener = jest.fn((data) => data);

    EventEmitter.listen(eventNameA, mockListener);
    EventEmitter.emit(eventNameA, data);

    expect(mockListener).toBeCalledTimes(1);
    expect(mockListener).toHaveBeenCalledWith(data);
  });

  it("should be able to remove a listener", () => {
    const eventNameA = "my-event-a";
    const data = "foo";

    const mockListener = jest.fn((data) => data);

    EventEmitter.listen(eventNameA, mockListener);
    EventEmitter.removeEvent(eventNameA);
    EventEmitter.emit(eventNameA, data);

    expect(mockListener).toBeCalledTimes(0);
  });

  it("should still running even if some listener is broken", () => {
    const eventName = "my-event";
    const mockListenerWithError = jest.fn();
    mockListenerWithError.mockImplementation(() => {
      throw new Error();
    });

    const mockListener = jest.fn(() => {});

    EventEmitter.listen(eventName, mockListener);
    EventEmitter.listen(eventName, mockListenerWithError);
    EventEmitter.emit(eventName);

    expect(mockListener).toBeCalledTimes(1);
  });

  it("should be able to add a listeners that will be triggered only once", () => {
    const eventNameA = "my-event-a";

    const mockListenerA = jest.fn(() => {});
    const mockListenerB = jest.fn(() => {});
    const mockListenerC = jest.fn(() => {});

    EventEmitter.listen(eventNameA, mockListenerA);
    EventEmitter.listenOnce(eventNameA, mockListenerB);
    EventEmitter.listenOnce(eventNameA, mockListenerC);

    EventEmitter.emit(eventNameA);
    EventEmitter.emit(eventNameA);

    expect(mockListenerA).toBeCalledTimes(2);
    expect(mockListenerB).toBeCalledTimes(1);
    expect(mockListenerC).toBeCalledTimes(1);
  });

  it("should be able to clear all events and its listeners", () => {
    const eventNameA = "my-event-a";
    const eventNameB = "my-event-b";

    const mockListenerA = jest.fn(() => {});
    const mockListenerB = jest.fn(() => {});

    EventEmitter.listen(eventNameA, mockListenerA);
    EventEmitter.listen(eventNameB, mockListenerB);
    EventEmitter.removeAllEvents();

    EventEmitter.emit(eventNameA);
    EventEmitter.emit(eventNameB);

    expect(mockListenerA).toBeCalledTimes(0);
    expect(mockListenerB).toBeCalledTimes(0);
  });
});
