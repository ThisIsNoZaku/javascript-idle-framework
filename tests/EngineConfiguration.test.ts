import EngineConfiguration from "../src/EngineConfiguration";

describe("the engine configuration", function() {
    var configuration: EngineConfiguration;
    beforeEach(() => {
        configuration = new EngineConfiguration()
            .WithGlobalProperties({
            property: "aString"
        });
    });
    it("has a global property declaration object", function() {
        expect(configuration.globals).not.toBeUndefined();
    })
    it("can declare a global property", function() {
        expect(configuration.globals["property"]).not.toBeUndefined();
    });
    it("throws an error if a property is defined with an object other than a configuration object", function () {
        expect(() => {
            new EngineConfiguration().WithGlobalProperties({
                anObject: {}
            });
        })
    });
    it("can use an object to configure a global property", function() {

    });
});