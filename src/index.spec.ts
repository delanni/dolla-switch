import $switch from "./index";

type Colors = "red" | "blue" | "green";
type HexColors = "#ff0000" | "#00ff00" | "#0000ff" | "#ffffff";
type Phrases = "Buon giorno!" | "Ayy caramba!" | "Guten morgen!";

describe("$switch.strict", () => {
  test("with bound strings", () => {
    const input = "red" as Colors;

    const redHex: HexColors = $switch.strict(input, {
      red: () => "#ff0000",
      blue: () => "#0000ff",
      green: () => "#00ff00",
    });

    expect(redHex === "#ff0000");
    expect(redHex).toBe("#ff0000");
  });

  test("with enums", () => {
    enum Emotions {
      sad,
      happy,
      dead,
    }
    enum Emojis {
      "😢",
      "😄",
      "💀",
    }
    const myCurrentEmotion: Emotions = Emotions.dead as Emotions;

    const meAsAnEmoji: Emojis = $switch.strict(myCurrentEmotion, {
      [Emotions.happy]: () => Emojis["😄"],
      [Emotions.sad]: () => Emojis["😢"],
      [Emotions.dead]: () => Emojis["💀"],
    });

    expect(meAsAnEmoji).toBe(Emojis["💀"]);
    expect(meAsAnEmoji === Emojis["💀"]).toBeTruthy();
  });

  test("with named enums", () => {
    enum Emotions {
      sad = "SAD",
      happy = "HAPPY",
      dead = "DEAD",
    }
    enum Emojis {
      happy = ":D",
      sad = ":(",
      dead = "x_x",
    }
    const myCurrentEmotion: Emotions = Emotions.dead as Emotions;

    const meAsAnEmoji: Emojis = $switch.strict(myCurrentEmotion, {
      [Emotions.happy]: () => Emojis.happy,
      [Emotions.dead]: () => Emojis.dead,
      [Emotions.sad]: () => Emojis.sad,
    });

    expect(meAsAnEmoji).toBe(Emojis.dead);
    expect(meAsAnEmoji === Emojis.dead).toBeTruthy();
  });

  test("with unbound strings - hit", () => {
    const favouriteVeggie: string = "potato" as string;

    const phrase = $switch.strict<string, Phrases>(favouriteVeggie, {
      tomato: () => "Buon giorno!",
      corn: () => "Ayy caramba!",
      potato: () => "Guten morgen!",
    });

    expect(phrase).toBe("Guten morgen!");
    expect(phrase === "Guten morgen!").toBeTruthy();
  });

  test("with unbound strings - miss", () => {
    const favouriteVeggie: string = "potato" as string;

    expect(() => {
      const phrase = $switch.strict(favouriteVeggie, {
        tomato: () => "Bon giorno!",
        corn: () => "Ayy caramba!",
      });
    }).toThrow();
  });
});
describe("$switch.default", () => {
  test("with bound strings - hit", () => {
    const input: Colors = "blue" as Colors;

    const fallbackHex: HexColors = $switch(
      input,
      {
        blue: () => "#0000ff",
        green: () => "#00ff00",
      },
      () => "#ffffff"
    );

    expect(fallbackHex).toBe("#0000ff");
    expect(fallbackHex === "#0000ff").toBeTruthy();
  });

  test("with bound strings - miss", () => {
    const input: Colors = "red" as Colors;

    const fallbackHex = $switch(
      input,
      {
        blue: () => "#0000ff",
        green: () => "#00ff00",
      },
      () => "#ffffff"
    );

    expect(fallbackHex).toBe("#ffffff");
    expect(fallbackHex === "#ffffff").toBeTruthy();
  });

  test("with enums - hit", () => {
    enum Emotions {
      sad,
      happy,
      dead,
    }
    enum Emojis {
      "😢",
      "😄",
      "💀",
      "💩",
    }
    const deadEmotion: Emotions = Emotions.dead as Emotions;
    const skullEmoji: Emojis = $switch(
      deadEmotion,
      {
        [Emotions.happy]: () => Emojis["😄"],
        [Emotions.dead]: () => Emojis["💀"],
      },
      () => Emojis["💩"]
    );

    expect(skullEmoji).toBe(Emojis["💀"]);
    expect(skullEmoji === Emojis["💀"]).toBeTruthy();
  });

  test("with undefined input", () => {
    enum Emotions {
      sad,
      happy,
      dead,
    }
    enum Emojis {
      "😢",
      "😄",
      "💀",
      "💩",
    }
    const poopEmoji: Emojis = $switch(
      undefined,
      {
        [Emotions.happy]: () => Emojis["😄"],
        [Emotions.dead]: () => Emojis["💀"],
      },
      () => Emojis["💩"]
    );

    expect(poopEmoji).toBe(Emojis["💩"]);
    expect(poopEmoji === Emojis["💩"]).toBeTruthy();
  });

  test("with null input", () => {
    enum Emotions {
      sad,
      happy,
      dead,
    }
    enum Emojis {
      "😢",
      "😄",
      "💀",
      "💩",
    }
    const poopEmoji: Emojis = $switch(
      null,
      {
        [Emotions.happy]: () => Emojis["😄"],
        [Emotions.dead]: () => Emojis["💀"],
      },
      () => Emojis["💩"]
    );

    expect(poopEmoji).toBe(Emojis["💩"]);
    expect(poopEmoji === Emojis["💩"]).toBeTruthy();
  });
});
