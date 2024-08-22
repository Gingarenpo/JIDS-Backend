"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineDetailPictureFactory = exports.defineDetailFactory = exports.defineThumbnailFactory = exports.defineQueueFactory = exports.defineIntersectionFactory = exports.definePedOfIntersectionFactory = exports.defineCarOfIntersectionFactory = exports.definePedFactory = exports.defineCarFactory = exports.defineAreaFactory = exports.definePrefFactory = exports.defineUserFactory = exports.defineRankFactory = exports.initialize = exports.resetScalarFieldValueGenerator = exports.registerScalarFieldValueGenerator = exports.resetSequence = void 0;
const internal_1 = require("@quramy/prisma-fabbrica/lib/internal");
var internal_2 = require("@quramy/prisma-fabbrica/lib/internal");
Object.defineProperty(exports, "resetSequence", { enumerable: true, get: function () { return internal_2.resetSequence; } });
Object.defineProperty(exports, "registerScalarFieldValueGenerator", { enumerable: true, get: function () { return internal_2.registerScalarFieldValueGenerator; } });
Object.defineProperty(exports, "resetScalarFieldValueGenerator", { enumerable: true, get: function () { return internal_2.resetScalarFieldValueGenerator; } });
const initializer = (0, internal_1.createInitializer)();
const { getClient } = initializer;
exports.initialize = initializer.initialize;
const modelFieldDefinitions = [{
        name: "Rank",
        fields: [{
                name: "users",
                type: "User",
                relationName: "RankToUser"
            }]
    }, {
        name: "User",
        fields: [{
                name: "rank",
                type: "Rank",
                relationName: "RankToUser"
            }, {
                name: "Queue",
                type: "Queue",
                relationName: "QueueToUser"
            }]
    }, {
        name: "Pref",
        fields: [{
                name: "area",
                type: "Area",
                relationName: "AreaToPref"
            }]
    }, {
        name: "Area",
        fields: [{
                name: "pref",
                type: "Pref",
                relationName: "AreaToPref"
            }, {
                name: "intersection",
                type: "Intersection",
                relationName: "AreaToIntersection"
            }]
    }, {
        name: "Car",
        fields: [{
                name: "intersections",
                type: "CarOfIntersection",
                relationName: "CarToCarOfIntersection"
            }]
    }, {
        name: "Ped",
        fields: [{
                name: "intersections",
                type: "PedOfIntersection",
                relationName: "PedToPedOfIntersection"
            }]
    }, {
        name: "CarOfIntersection",
        fields: [{
                name: "car",
                type: "Car",
                relationName: "CarToCarOfIntersection"
            }, {
                name: "intersection",
                type: "Intersection",
                relationName: "CarOfIntersectionToIntersection"
            }]
    }, {
        name: "PedOfIntersection",
        fields: [{
                name: "ped",
                type: "Ped",
                relationName: "PedToPedOfIntersection"
            }, {
                name: "intersection",
                type: "Intersection",
                relationName: "IntersectionToPedOfIntersection"
            }]
    }, {
        name: "Intersection",
        fields: [{
                name: "area",
                type: "Area",
                relationName: "AreaToIntersection"
            }, {
                name: "cars",
                type: "CarOfIntersection",
                relationName: "CarOfIntersectionToIntersection"
            }, {
                name: "peds",
                type: "PedOfIntersection",
                relationName: "IntersectionToPedOfIntersection"
            }, {
                name: "parent",
                type: "Intersection",
                relationName: "controll_family"
            }, {
                name: "child",
                type: "Intersection",
                relationName: "controll_family"
            }, {
                name: "thumbnails",
                type: "Thumbnail",
                relationName: "IntersectionToThumbnail"
            }, {
                name: "details",
                type: "Detail",
                relationName: "DetailToIntersection"
            }]
    }, {
        name: "Queue",
        fields: [{
                name: "user",
                type: "User",
                relationName: "QueueToUser"
            }, {
                name: "thumbnails",
                type: "Thumbnail",
                relationName: "QueueToThumbnail"
            }, {
                name: "details",
                type: "Detail",
                relationName: "DetailToQueue"
            }]
    }, {
        name: "Thumbnail",
        fields: [{
                name: "queue",
                type: "Queue",
                relationName: "QueueToThumbnail"
            }, {
                name: "intersection",
                type: "Intersection",
                relationName: "IntersectionToThumbnail"
            }]
    }, {
        name: "Detail",
        fields: [{
                name: "queue",
                type: "Queue",
                relationName: "DetailToQueue"
            }, {
                name: "intersection",
                type: "Intersection",
                relationName: "DetailToIntersection"
            }, {
                name: "pictures",
                type: "DetailPicture",
                relationName: "DetailToDetailPicture"
            }]
    }, {
        name: "DetailPicture",
        fields: [{
                name: "detail",
                type: "Detail",
                relationName: "DetailToDetailPicture"
            }]
    }];
function autoGenerateRankScalarsOrEnums({ seq }) {
    return {
        id: (0, internal_1.getScalarFieldValueGenerator)().Int({ modelName: "Rank", fieldName: "id", isId: true, isUnique: false, seq }),
        name: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Rank", fieldName: "name", isId: false, isUnique: true, seq }),
        needScore: (0, internal_1.getScalarFieldValueGenerator)().Int({ modelName: "Rank", fieldName: "needScore", isId: false, isUnique: false, seq })
    };
}
function defineRankFactoryInternal({ defaultData: defaultDataResolver, onAfterBuild, onBeforeCreate, onAfterCreate, traits: traitsDefs = {} }, defaultTransientFieldValues) {
    const getFactoryWithTraits = (traitKeys = []) => {
        const seqKey = {};
        const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
        const screen = (0, internal_1.createScreener)("Rank", modelFieldDefinitions);
        const handleAfterBuild = (0, internal_1.createCallbackChain)([
            onAfterBuild,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterBuild),
        ]);
        const handleBeforeCreate = (0, internal_1.createCallbackChain)([
            ...traitKeys.slice().reverse().map(traitKey => traitsDefs[traitKey]?.onBeforeCreate),
            onBeforeCreate,
        ]);
        const handleAfterCreate = (0, internal_1.createCallbackChain)([
            onAfterCreate,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterCreate),
        ]);
        const build = async (inputData = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateRankScalarsOrEnums({ seq });
            const resolveValue = (0, internal_1.normalizeResolver)(defaultDataResolver ?? {});
            const [transientFields, filteredInputData] = (0, internal_1.destructure)(defaultTransientFieldValues, inputData);
            const resolverInput = { seq, ...transientFields };
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = (0, internal_1.normalizeResolver)(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue(resolverInput);
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue(resolverInput));
            const defaultAssociations = {};
            const data = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...filteredInputData };
            await handleAfterBuild(data, transientFields);
            return data;
        };
        const buildList = (...args) => Promise.all((0, internal_1.normalizeList)(...args).map(data => build(data)));
        const pickForConnect = (inputData) => ({
            id: inputData.id
        });
        const create = async (inputData = {}) => {
            const [transientFields] = (0, internal_1.destructure)(defaultTransientFieldValues, inputData);
            const data = await build(inputData).then(screen);
            await handleBeforeCreate(data, transientFields);
            const createdData = await getClient().rank.create({ data });
            await handleAfterCreate(createdData, transientFields);
            return createdData;
        };
        const createList = (...args) => Promise.all((0, internal_1.normalizeList)(...args).map(data => create(data)));
        const createForConnect = (inputData = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Rank",
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name, ...names) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}
exports.defineRankFactory = ((options) => {
    return defineRankFactoryInternal(options ?? {}, {});
});
exports.defineRankFactory.withTransientFields = defaultTransientFieldValues => options => defineRankFactoryInternal(options ?? {}, defaultTransientFieldValues);
function isUserrankFactory(x) {
    return x?._factoryFor === "Rank";
}
function autoGenerateUserScalarsOrEnums({ seq }) {
    return {
        id: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "User", fieldName: "id", isId: true, isUnique: false, seq }),
        address: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "User", fieldName: "address", isId: false, isUnique: true, seq }),
        name: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "User", fieldName: "name", isId: false, isUnique: true, seq }),
        password: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "User", fieldName: "password", isId: false, isUnique: false, seq })
    };
}
function defineUserFactoryInternal({ defaultData: defaultDataResolver, onAfterBuild, onBeforeCreate, onAfterCreate, traits: traitsDefs = {} }, defaultTransientFieldValues) {
    const getFactoryWithTraits = (traitKeys = []) => {
        const seqKey = {};
        const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
        const screen = (0, internal_1.createScreener)("User", modelFieldDefinitions);
        const handleAfterBuild = (0, internal_1.createCallbackChain)([
            onAfterBuild,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterBuild),
        ]);
        const handleBeforeCreate = (0, internal_1.createCallbackChain)([
            ...traitKeys.slice().reverse().map(traitKey => traitsDefs[traitKey]?.onBeforeCreate),
            onBeforeCreate,
        ]);
        const handleAfterCreate = (0, internal_1.createCallbackChain)([
            onAfterCreate,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterCreate),
        ]);
        const build = async (inputData = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateUserScalarsOrEnums({ seq });
            const resolveValue = (0, internal_1.normalizeResolver)(defaultDataResolver ?? {});
            const [transientFields, filteredInputData] = (0, internal_1.destructure)(defaultTransientFieldValues, inputData);
            const resolverInput = { seq, ...transientFields };
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = (0, internal_1.normalizeResolver)(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue(resolverInput);
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue(resolverInput));
            const defaultAssociations = {
                rank: isUserrankFactory(defaultData.rank) ? {
                    create: await defaultData.rank.build()
                } : defaultData.rank
            };
            const data = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...filteredInputData };
            await handleAfterBuild(data, transientFields);
            return data;
        };
        const buildList = (...args) => Promise.all((0, internal_1.normalizeList)(...args).map(data => build(data)));
        const pickForConnect = (inputData) => ({
            id: inputData.id
        });
        const create = async (inputData = {}) => {
            const [transientFields] = (0, internal_1.destructure)(defaultTransientFieldValues, inputData);
            const data = await build(inputData).then(screen);
            await handleBeforeCreate(data, transientFields);
            const createdData = await getClient().user.create({ data });
            await handleAfterCreate(createdData, transientFields);
            return createdData;
        };
        const createList = (...args) => Promise.all((0, internal_1.normalizeList)(...args).map(data => create(data)));
        const createForConnect = (inputData = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "User",
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name, ...names) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}
exports.defineUserFactory = ((options) => {
    return defineUserFactoryInternal(options ?? {}, {});
});
exports.defineUserFactory.withTransientFields = defaultTransientFieldValues => options => defineUserFactoryInternal(options ?? {}, defaultTransientFieldValues);
function autoGeneratePrefScalarsOrEnums({ seq }) {
    return {
        id: (0, internal_1.getScalarFieldValueGenerator)().Int({ modelName: "Pref", fieldName: "id", isId: true, isUnique: false, seq }),
        name: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Pref", fieldName: "name", isId: false, isUnique: true, seq })
    };
}
function definePrefFactoryInternal({ defaultData: defaultDataResolver, onAfterBuild, onBeforeCreate, onAfterCreate, traits: traitsDefs = {} }, defaultTransientFieldValues) {
    const getFactoryWithTraits = (traitKeys = []) => {
        const seqKey = {};
        const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
        const screen = (0, internal_1.createScreener)("Pref", modelFieldDefinitions);
        const handleAfterBuild = (0, internal_1.createCallbackChain)([
            onAfterBuild,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterBuild),
        ]);
        const handleBeforeCreate = (0, internal_1.createCallbackChain)([
            ...traitKeys.slice().reverse().map(traitKey => traitsDefs[traitKey]?.onBeforeCreate),
            onBeforeCreate,
        ]);
        const handleAfterCreate = (0, internal_1.createCallbackChain)([
            onAfterCreate,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterCreate),
        ]);
        const build = async (inputData = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGeneratePrefScalarsOrEnums({ seq });
            const resolveValue = (0, internal_1.normalizeResolver)(defaultDataResolver ?? {});
            const [transientFields, filteredInputData] = (0, internal_1.destructure)(defaultTransientFieldValues, inputData);
            const resolverInput = { seq, ...transientFields };
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = (0, internal_1.normalizeResolver)(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue(resolverInput);
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue(resolverInput));
            const defaultAssociations = {};
            const data = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...filteredInputData };
            await handleAfterBuild(data, transientFields);
            return data;
        };
        const buildList = (...args) => Promise.all((0, internal_1.normalizeList)(...args).map(data => build(data)));
        const pickForConnect = (inputData) => ({
            id: inputData.id
        });
        const create = async (inputData = {}) => {
            const [transientFields] = (0, internal_1.destructure)(defaultTransientFieldValues, inputData);
            const data = await build(inputData).then(screen);
            await handleBeforeCreate(data, transientFields);
            const createdData = await getClient().pref.create({ data });
            await handleAfterCreate(createdData, transientFields);
            return createdData;
        };
        const createList = (...args) => Promise.all((0, internal_1.normalizeList)(...args).map(data => create(data)));
        const createForConnect = (inputData = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Pref",
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name, ...names) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}
exports.definePrefFactory = ((options) => {
    return definePrefFactoryInternal(options ?? {}, {});
});
exports.definePrefFactory.withTransientFields = defaultTransientFieldValues => options => definePrefFactoryInternal(options ?? {}, defaultTransientFieldValues);
function isAreaprefFactory(x) {
    return x?._factoryFor === "Pref";
}
function autoGenerateAreaScalarsOrEnums({ seq }) {
    return {
        id: (0, internal_1.getScalarFieldValueGenerator)().Int({ modelName: "Area", fieldName: "id", isId: true, isUnique: true, seq }),
        name: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Area", fieldName: "name", isId: false, isUnique: false, seq })
    };
}
function defineAreaFactoryInternal({ defaultData: defaultDataResolver, onAfterBuild, onBeforeCreate, onAfterCreate, traits: traitsDefs = {} }, defaultTransientFieldValues) {
    const getFactoryWithTraits = (traitKeys = []) => {
        const seqKey = {};
        const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
        const screen = (0, internal_1.createScreener)("Area", modelFieldDefinitions);
        const handleAfterBuild = (0, internal_1.createCallbackChain)([
            onAfterBuild,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterBuild),
        ]);
        const handleBeforeCreate = (0, internal_1.createCallbackChain)([
            ...traitKeys.slice().reverse().map(traitKey => traitsDefs[traitKey]?.onBeforeCreate),
            onBeforeCreate,
        ]);
        const handleAfterCreate = (0, internal_1.createCallbackChain)([
            onAfterCreate,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterCreate),
        ]);
        const build = async (inputData = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateAreaScalarsOrEnums({ seq });
            const resolveValue = (0, internal_1.normalizeResolver)(defaultDataResolver);
            const [transientFields, filteredInputData] = (0, internal_1.destructure)(defaultTransientFieldValues, inputData);
            const resolverInput = { seq, ...transientFields };
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = (0, internal_1.normalizeResolver)(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue(resolverInput);
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue(resolverInput));
            const defaultAssociations = {
                pref: isAreaprefFactory(defaultData.pref) ? {
                    create: await defaultData.pref.build()
                } : defaultData.pref
            };
            const data = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...filteredInputData };
            await handleAfterBuild(data, transientFields);
            return data;
        };
        const buildList = (...args) => Promise.all((0, internal_1.normalizeList)(...args).map(data => build(data)));
        const pickForConnect = (inputData) => ({
            prefId: inputData.prefId,
            id: inputData.id
        });
        const create = async (inputData = {}) => {
            const [transientFields] = (0, internal_1.destructure)(defaultTransientFieldValues, inputData);
            const data = await build(inputData).then(screen);
            await handleBeforeCreate(data, transientFields);
            const createdData = await getClient().area.create({ data });
            await handleAfterCreate(createdData, transientFields);
            return createdData;
        };
        const createList = (...args) => Promise.all((0, internal_1.normalizeList)(...args).map(data => create(data)));
        const createForConnect = (inputData = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Area",
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name, ...names) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}
exports.defineAreaFactory = ((options) => {
    return defineAreaFactoryInternal(options, {});
});
exports.defineAreaFactory.withTransientFields = defaultTransientFieldValues => options => defineAreaFactoryInternal(options, defaultTransientFieldValues);
function autoGenerateCarScalarsOrEnums({ seq }) {
    return {
        code: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Car", fieldName: "code", isId: true, isUnique: false, seq }),
        maker: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Car", fieldName: "maker", isId: false, isUnique: false, seq }),
        name: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Car", fieldName: "name", isId: false, isUnique: false, seq }),
        createDate: (0, internal_1.getScalarFieldValueGenerator)().DateTime({ modelName: "Car", fieldName: "createDate", isId: false, isUnique: false, seq })
    };
}
function defineCarFactoryInternal({ defaultData: defaultDataResolver, onAfterBuild, onBeforeCreate, onAfterCreate, traits: traitsDefs = {} }, defaultTransientFieldValues) {
    const getFactoryWithTraits = (traitKeys = []) => {
        const seqKey = {};
        const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
        const screen = (0, internal_1.createScreener)("Car", modelFieldDefinitions);
        const handleAfterBuild = (0, internal_1.createCallbackChain)([
            onAfterBuild,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterBuild),
        ]);
        const handleBeforeCreate = (0, internal_1.createCallbackChain)([
            ...traitKeys.slice().reverse().map(traitKey => traitsDefs[traitKey]?.onBeforeCreate),
            onBeforeCreate,
        ]);
        const handleAfterCreate = (0, internal_1.createCallbackChain)([
            onAfterCreate,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterCreate),
        ]);
        const build = async (inputData = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateCarScalarsOrEnums({ seq });
            const resolveValue = (0, internal_1.normalizeResolver)(defaultDataResolver ?? {});
            const [transientFields, filteredInputData] = (0, internal_1.destructure)(defaultTransientFieldValues, inputData);
            const resolverInput = { seq, ...transientFields };
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = (0, internal_1.normalizeResolver)(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue(resolverInput);
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue(resolverInput));
            const defaultAssociations = {};
            const data = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...filteredInputData };
            await handleAfterBuild(data, transientFields);
            return data;
        };
        const buildList = (...args) => Promise.all((0, internal_1.normalizeList)(...args).map(data => build(data)));
        const pickForConnect = (inputData) => ({
            code: inputData.code
        });
        const create = async (inputData = {}) => {
            const [transientFields] = (0, internal_1.destructure)(defaultTransientFieldValues, inputData);
            const data = await build(inputData).then(screen);
            await handleBeforeCreate(data, transientFields);
            const createdData = await getClient().car.create({ data });
            await handleAfterCreate(createdData, transientFields);
            return createdData;
        };
        const createList = (...args) => Promise.all((0, internal_1.normalizeList)(...args).map(data => create(data)));
        const createForConnect = (inputData = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Car",
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name, ...names) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}
exports.defineCarFactory = ((options) => {
    return defineCarFactoryInternal(options ?? {}, {});
});
exports.defineCarFactory.withTransientFields = defaultTransientFieldValues => options => defineCarFactoryInternal(options ?? {}, defaultTransientFieldValues);
function autoGeneratePedScalarsOrEnums({ seq }) {
    return {
        code: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Ped", fieldName: "code", isId: true, isUnique: false, seq }),
        maker: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Ped", fieldName: "maker", isId: false, isUnique: false, seq }),
        name: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Ped", fieldName: "name", isId: false, isUnique: false, seq }),
        createDate: (0, internal_1.getScalarFieldValueGenerator)().DateTime({ modelName: "Ped", fieldName: "createDate", isId: false, isUnique: false, seq })
    };
}
function definePedFactoryInternal({ defaultData: defaultDataResolver, onAfterBuild, onBeforeCreate, onAfterCreate, traits: traitsDefs = {} }, defaultTransientFieldValues) {
    const getFactoryWithTraits = (traitKeys = []) => {
        const seqKey = {};
        const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
        const screen = (0, internal_1.createScreener)("Ped", modelFieldDefinitions);
        const handleAfterBuild = (0, internal_1.createCallbackChain)([
            onAfterBuild,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterBuild),
        ]);
        const handleBeforeCreate = (0, internal_1.createCallbackChain)([
            ...traitKeys.slice().reverse().map(traitKey => traitsDefs[traitKey]?.onBeforeCreate),
            onBeforeCreate,
        ]);
        const handleAfterCreate = (0, internal_1.createCallbackChain)([
            onAfterCreate,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterCreate),
        ]);
        const build = async (inputData = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGeneratePedScalarsOrEnums({ seq });
            const resolveValue = (0, internal_1.normalizeResolver)(defaultDataResolver ?? {});
            const [transientFields, filteredInputData] = (0, internal_1.destructure)(defaultTransientFieldValues, inputData);
            const resolverInput = { seq, ...transientFields };
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = (0, internal_1.normalizeResolver)(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue(resolverInput);
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue(resolverInput));
            const defaultAssociations = {};
            const data = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...filteredInputData };
            await handleAfterBuild(data, transientFields);
            return data;
        };
        const buildList = (...args) => Promise.all((0, internal_1.normalizeList)(...args).map(data => build(data)));
        const pickForConnect = (inputData) => ({
            code: inputData.code
        });
        const create = async (inputData = {}) => {
            const [transientFields] = (0, internal_1.destructure)(defaultTransientFieldValues, inputData);
            const data = await build(inputData).then(screen);
            await handleBeforeCreate(data, transientFields);
            const createdData = await getClient().ped.create({ data });
            await handleAfterCreate(createdData, transientFields);
            return createdData;
        };
        const createList = (...args) => Promise.all((0, internal_1.normalizeList)(...args).map(data => create(data)));
        const createForConnect = (inputData = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Ped",
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name, ...names) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}
exports.definePedFactory = ((options) => {
    return definePedFactoryInternal(options ?? {}, {});
});
exports.definePedFactory.withTransientFields = defaultTransientFieldValues => options => definePedFactoryInternal(options ?? {}, defaultTransientFieldValues);
function isCarOfIntersectioncarFactory(x) {
    return x?._factoryFor === "Car";
}
function isCarOfIntersectionintersectionFactory(x) {
    return x?._factoryFor === "Intersection";
}
function autoGenerateCarOfIntersectionScalarsOrEnums({ seq }) {
    return {};
}
function defineCarOfIntersectionFactoryInternal({ defaultData: defaultDataResolver, onAfterBuild, onBeforeCreate, onAfterCreate, traits: traitsDefs = {} }, defaultTransientFieldValues) {
    const getFactoryWithTraits = (traitKeys = []) => {
        const seqKey = {};
        const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
        const screen = (0, internal_1.createScreener)("CarOfIntersection", modelFieldDefinitions);
        const handleAfterBuild = (0, internal_1.createCallbackChain)([
            onAfterBuild,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterBuild),
        ]);
        const handleBeforeCreate = (0, internal_1.createCallbackChain)([
            ...traitKeys.slice().reverse().map(traitKey => traitsDefs[traitKey]?.onBeforeCreate),
            onBeforeCreate,
        ]);
        const handleAfterCreate = (0, internal_1.createCallbackChain)([
            onAfterCreate,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterCreate),
        ]);
        const build = async (inputData = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateCarOfIntersectionScalarsOrEnums({ seq });
            const resolveValue = (0, internal_1.normalizeResolver)(defaultDataResolver);
            const [transientFields, filteredInputData] = (0, internal_1.destructure)(defaultTransientFieldValues, inputData);
            const resolverInput = { seq, ...transientFields };
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = (0, internal_1.normalizeResolver)(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue(resolverInput);
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue(resolverInput));
            const defaultAssociations = {
                car: isCarOfIntersectioncarFactory(defaultData.car) ? {
                    create: await defaultData.car.build()
                } : defaultData.car,
                intersection: isCarOfIntersectionintersectionFactory(defaultData.intersection) ? {
                    create: await defaultData.intersection.build()
                } : defaultData.intersection
            };
            const data = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...filteredInputData };
            await handleAfterBuild(data, transientFields);
            return data;
        };
        const buildList = (...args) => Promise.all((0, internal_1.normalizeList)(...args).map(data => build(data)));
        const pickForConnect = (inputData) => ({
            carCode: inputData.carCode,
            prefId: inputData.prefId,
            areaId: inputData.areaId,
            intersectionId: inputData.intersectionId
        });
        const create = async (inputData = {}) => {
            const [transientFields] = (0, internal_1.destructure)(defaultTransientFieldValues, inputData);
            const data = await build(inputData).then(screen);
            await handleBeforeCreate(data, transientFields);
            const createdData = await getClient().carOfIntersection.create({ data });
            await handleAfterCreate(createdData, transientFields);
            return createdData;
        };
        const createList = (...args) => Promise.all((0, internal_1.normalizeList)(...args).map(data => create(data)));
        const createForConnect = (inputData = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "CarOfIntersection",
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name, ...names) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}
exports.defineCarOfIntersectionFactory = ((options) => {
    return defineCarOfIntersectionFactoryInternal(options, {});
});
exports.defineCarOfIntersectionFactory.withTransientFields = defaultTransientFieldValues => options => defineCarOfIntersectionFactoryInternal(options, defaultTransientFieldValues);
function isPedOfIntersectionpedFactory(x) {
    return x?._factoryFor === "Ped";
}
function isPedOfIntersectionintersectionFactory(x) {
    return x?._factoryFor === "Intersection";
}
function autoGeneratePedOfIntersectionScalarsOrEnums({ seq }) {
    return {};
}
function definePedOfIntersectionFactoryInternal({ defaultData: defaultDataResolver, onAfterBuild, onBeforeCreate, onAfterCreate, traits: traitsDefs = {} }, defaultTransientFieldValues) {
    const getFactoryWithTraits = (traitKeys = []) => {
        const seqKey = {};
        const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
        const screen = (0, internal_1.createScreener)("PedOfIntersection", modelFieldDefinitions);
        const handleAfterBuild = (0, internal_1.createCallbackChain)([
            onAfterBuild,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterBuild),
        ]);
        const handleBeforeCreate = (0, internal_1.createCallbackChain)([
            ...traitKeys.slice().reverse().map(traitKey => traitsDefs[traitKey]?.onBeforeCreate),
            onBeforeCreate,
        ]);
        const handleAfterCreate = (0, internal_1.createCallbackChain)([
            onAfterCreate,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterCreate),
        ]);
        const build = async (inputData = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGeneratePedOfIntersectionScalarsOrEnums({ seq });
            const resolveValue = (0, internal_1.normalizeResolver)(defaultDataResolver);
            const [transientFields, filteredInputData] = (0, internal_1.destructure)(defaultTransientFieldValues, inputData);
            const resolverInput = { seq, ...transientFields };
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = (0, internal_1.normalizeResolver)(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue(resolverInput);
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue(resolverInput));
            const defaultAssociations = {
                ped: isPedOfIntersectionpedFactory(defaultData.ped) ? {
                    create: await defaultData.ped.build()
                } : defaultData.ped,
                intersection: isPedOfIntersectionintersectionFactory(defaultData.intersection) ? {
                    create: await defaultData.intersection.build()
                } : defaultData.intersection
            };
            const data = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...filteredInputData };
            await handleAfterBuild(data, transientFields);
            return data;
        };
        const buildList = (...args) => Promise.all((0, internal_1.normalizeList)(...args).map(data => build(data)));
        const pickForConnect = (inputData) => ({
            pedCode: inputData.pedCode,
            prefId: inputData.prefId,
            areaId: inputData.areaId,
            intersectionId: inputData.intersectionId
        });
        const create = async (inputData = {}) => {
            const [transientFields] = (0, internal_1.destructure)(defaultTransientFieldValues, inputData);
            const data = await build(inputData).then(screen);
            await handleBeforeCreate(data, transientFields);
            const createdData = await getClient().pedOfIntersection.create({ data });
            await handleAfterCreate(createdData, transientFields);
            return createdData;
        };
        const createList = (...args) => Promise.all((0, internal_1.normalizeList)(...args).map(data => create(data)));
        const createForConnect = (inputData = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "PedOfIntersection",
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name, ...names) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}
exports.definePedOfIntersectionFactory = ((options) => {
    return definePedOfIntersectionFactoryInternal(options, {});
});
exports.definePedOfIntersectionFactory.withTransientFields = defaultTransientFieldValues => options => definePedOfIntersectionFactoryInternal(options, defaultTransientFieldValues);
function isIntersectionareaFactory(x) {
    return x?._factoryFor === "Area";
}
function isIntersectionparentFactory(x) {
    return x?._factoryFor === "Intersection";
}
function autoGenerateIntersectionScalarsOrEnums({ seq }) {
    return {
        id: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Intersection", fieldName: "id", isId: true, isUnique: true, seq })
    };
}
function defineIntersectionFactoryInternal({ defaultData: defaultDataResolver, onAfterBuild, onBeforeCreate, onAfterCreate, traits: traitsDefs = {} }, defaultTransientFieldValues) {
    const getFactoryWithTraits = (traitKeys = []) => {
        const seqKey = {};
        const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
        const screen = (0, internal_1.createScreener)("Intersection", modelFieldDefinitions);
        const handleAfterBuild = (0, internal_1.createCallbackChain)([
            onAfterBuild,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterBuild),
        ]);
        const handleBeforeCreate = (0, internal_1.createCallbackChain)([
            ...traitKeys.slice().reverse().map(traitKey => traitsDefs[traitKey]?.onBeforeCreate),
            onBeforeCreate,
        ]);
        const handleAfterCreate = (0, internal_1.createCallbackChain)([
            onAfterCreate,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterCreate),
        ]);
        const build = async (inputData = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateIntersectionScalarsOrEnums({ seq });
            const resolveValue = (0, internal_1.normalizeResolver)(defaultDataResolver);
            const [transientFields, filteredInputData] = (0, internal_1.destructure)(defaultTransientFieldValues, inputData);
            const resolverInput = { seq, ...transientFields };
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = (0, internal_1.normalizeResolver)(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue(resolverInput);
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue(resolverInput));
            const defaultAssociations = {
                area: isIntersectionareaFactory(defaultData.area) ? {
                    create: await defaultData.area.build()
                } : defaultData.area,
                parent: isIntersectionparentFactory(defaultData.parent) ? {
                    create: await defaultData.parent.build()
                } : defaultData.parent
            };
            const data = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...filteredInputData };
            await handleAfterBuild(data, transientFields);
            return data;
        };
        const buildList = (...args) => Promise.all((0, internal_1.normalizeList)(...args).map(data => build(data)));
        const pickForConnect = (inputData) => ({
            prefId: inputData.prefId,
            areaId: inputData.areaId,
            id: inputData.id
        });
        const create = async (inputData = {}) => {
            const [transientFields] = (0, internal_1.destructure)(defaultTransientFieldValues, inputData);
            const data = await build(inputData).then(screen);
            await handleBeforeCreate(data, transientFields);
            const createdData = await getClient().intersection.create({ data });
            await handleAfterCreate(createdData, transientFields);
            return createdData;
        };
        const createList = (...args) => Promise.all((0, internal_1.normalizeList)(...args).map(data => create(data)));
        const createForConnect = (inputData = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Intersection",
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name, ...names) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}
exports.defineIntersectionFactory = ((options) => {
    return defineIntersectionFactoryInternal(options, {});
});
exports.defineIntersectionFactory.withTransientFields = defaultTransientFieldValues => options => defineIntersectionFactoryInternal(options, defaultTransientFieldValues);
function isQueueuserFactory(x) {
    return x?._factoryFor === "User";
}
function autoGenerateQueueScalarsOrEnums({ seq }) {
    return {};
}
function defineQueueFactoryInternal({ defaultData: defaultDataResolver, onAfterBuild, onBeforeCreate, onAfterCreate, traits: traitsDefs = {} }, defaultTransientFieldValues) {
    const getFactoryWithTraits = (traitKeys = []) => {
        const seqKey = {};
        const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
        const screen = (0, internal_1.createScreener)("Queue", modelFieldDefinitions);
        const handleAfterBuild = (0, internal_1.createCallbackChain)([
            onAfterBuild,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterBuild),
        ]);
        const handleBeforeCreate = (0, internal_1.createCallbackChain)([
            ...traitKeys.slice().reverse().map(traitKey => traitsDefs[traitKey]?.onBeforeCreate),
            onBeforeCreate,
        ]);
        const handleAfterCreate = (0, internal_1.createCallbackChain)([
            onAfterCreate,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterCreate),
        ]);
        const build = async (inputData = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateQueueScalarsOrEnums({ seq });
            const resolveValue = (0, internal_1.normalizeResolver)(defaultDataResolver);
            const [transientFields, filteredInputData] = (0, internal_1.destructure)(defaultTransientFieldValues, inputData);
            const resolverInput = { seq, ...transientFields };
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = (0, internal_1.normalizeResolver)(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue(resolverInput);
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue(resolverInput));
            const defaultAssociations = {
                user: isQueueuserFactory(defaultData.user) ? {
                    create: await defaultData.user.build()
                } : defaultData.user
            };
            const data = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...filteredInputData };
            await handleAfterBuild(data, transientFields);
            return data;
        };
        const buildList = (...args) => Promise.all((0, internal_1.normalizeList)(...args).map(data => build(data)));
        const pickForConnect = (inputData) => ({
            id: inputData.id,
            userId: inputData.userId
        });
        const create = async (inputData = {}) => {
            const [transientFields] = (0, internal_1.destructure)(defaultTransientFieldValues, inputData);
            const data = await build(inputData).then(screen);
            await handleBeforeCreate(data, transientFields);
            const createdData = await getClient().queue.create({ data });
            await handleAfterCreate(createdData, transientFields);
            return createdData;
        };
        const createList = (...args) => Promise.all((0, internal_1.normalizeList)(...args).map(data => create(data)));
        const createForConnect = (inputData = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Queue",
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name, ...names) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}
exports.defineQueueFactory = ((options) => {
    return defineQueueFactoryInternal(options, {});
});
exports.defineQueueFactory.withTransientFields = defaultTransientFieldValues => options => defineQueueFactoryInternal(options, defaultTransientFieldValues);
function isThumbnailqueueFactory(x) {
    return x?._factoryFor === "Queue";
}
function isThumbnailintersectionFactory(x) {
    return x?._factoryFor === "Intersection";
}
function autoGenerateThumbnailScalarsOrEnums({ seq }) {
    return {};
}
function defineThumbnailFactoryInternal({ defaultData: defaultDataResolver, onAfterBuild, onBeforeCreate, onAfterCreate, traits: traitsDefs = {} }, defaultTransientFieldValues) {
    const getFactoryWithTraits = (traitKeys = []) => {
        const seqKey = {};
        const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
        const screen = (0, internal_1.createScreener)("Thumbnail", modelFieldDefinitions);
        const handleAfterBuild = (0, internal_1.createCallbackChain)([
            onAfterBuild,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterBuild),
        ]);
        const handleBeforeCreate = (0, internal_1.createCallbackChain)([
            ...traitKeys.slice().reverse().map(traitKey => traitsDefs[traitKey]?.onBeforeCreate),
            onBeforeCreate,
        ]);
        const handleAfterCreate = (0, internal_1.createCallbackChain)([
            onAfterCreate,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterCreate),
        ]);
        const build = async (inputData = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateThumbnailScalarsOrEnums({ seq });
            const resolveValue = (0, internal_1.normalizeResolver)(defaultDataResolver);
            const [transientFields, filteredInputData] = (0, internal_1.destructure)(defaultTransientFieldValues, inputData);
            const resolverInput = { seq, ...transientFields };
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = (0, internal_1.normalizeResolver)(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue(resolverInput);
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue(resolverInput));
            const defaultAssociations = {
                queue: isThumbnailqueueFactory(defaultData.queue) ? {
                    create: await defaultData.queue.build()
                } : defaultData.queue,
                intersection: isThumbnailintersectionFactory(defaultData.intersection) ? {
                    create: await defaultData.intersection.build()
                } : defaultData.intersection
            };
            const data = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...filteredInputData };
            await handleAfterBuild(data, transientFields);
            return data;
        };
        const buildList = (...args) => Promise.all((0, internal_1.normalizeList)(...args).map(data => build(data)));
        const pickForConnect = (inputData) => ({
            id: inputData.id
        });
        const create = async (inputData = {}) => {
            const [transientFields] = (0, internal_1.destructure)(defaultTransientFieldValues, inputData);
            const data = await build(inputData).then(screen);
            await handleBeforeCreate(data, transientFields);
            const createdData = await getClient().thumbnail.create({ data });
            await handleAfterCreate(createdData, transientFields);
            return createdData;
        };
        const createList = (...args) => Promise.all((0, internal_1.normalizeList)(...args).map(data => create(data)));
        const createForConnect = (inputData = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Thumbnail",
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name, ...names) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}
exports.defineThumbnailFactory = ((options) => {
    return defineThumbnailFactoryInternal(options, {});
});
exports.defineThumbnailFactory.withTransientFields = defaultTransientFieldValues => options => defineThumbnailFactoryInternal(options, defaultTransientFieldValues);
function isDetailqueueFactory(x) {
    return x?._factoryFor === "Queue";
}
function isDetailintersectionFactory(x) {
    return x?._factoryFor === "Intersection";
}
function autoGenerateDetailScalarsOrEnums({ seq }) {
    return {};
}
function defineDetailFactoryInternal({ defaultData: defaultDataResolver, onAfterBuild, onBeforeCreate, onAfterCreate, traits: traitsDefs = {} }, defaultTransientFieldValues) {
    const getFactoryWithTraits = (traitKeys = []) => {
        const seqKey = {};
        const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
        const screen = (0, internal_1.createScreener)("Detail", modelFieldDefinitions);
        const handleAfterBuild = (0, internal_1.createCallbackChain)([
            onAfterBuild,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterBuild),
        ]);
        const handleBeforeCreate = (0, internal_1.createCallbackChain)([
            ...traitKeys.slice().reverse().map(traitKey => traitsDefs[traitKey]?.onBeforeCreate),
            onBeforeCreate,
        ]);
        const handleAfterCreate = (0, internal_1.createCallbackChain)([
            onAfterCreate,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterCreate),
        ]);
        const build = async (inputData = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateDetailScalarsOrEnums({ seq });
            const resolveValue = (0, internal_1.normalizeResolver)(defaultDataResolver);
            const [transientFields, filteredInputData] = (0, internal_1.destructure)(defaultTransientFieldValues, inputData);
            const resolverInput = { seq, ...transientFields };
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = (0, internal_1.normalizeResolver)(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue(resolverInput);
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue(resolverInput));
            const defaultAssociations = {
                queue: isDetailqueueFactory(defaultData.queue) ? {
                    create: await defaultData.queue.build()
                } : defaultData.queue,
                intersection: isDetailintersectionFactory(defaultData.intersection) ? {
                    create: await defaultData.intersection.build()
                } : defaultData.intersection
            };
            const data = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...filteredInputData };
            await handleAfterBuild(data, transientFields);
            return data;
        };
        const buildList = (...args) => Promise.all((0, internal_1.normalizeList)(...args).map(data => build(data)));
        const pickForConnect = (inputData) => ({
            id: inputData.id
        });
        const create = async (inputData = {}) => {
            const [transientFields] = (0, internal_1.destructure)(defaultTransientFieldValues, inputData);
            const data = await build(inputData).then(screen);
            await handleBeforeCreate(data, transientFields);
            const createdData = await getClient().detail.create({ data });
            await handleAfterCreate(createdData, transientFields);
            return createdData;
        };
        const createList = (...args) => Promise.all((0, internal_1.normalizeList)(...args).map(data => create(data)));
        const createForConnect = (inputData = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Detail",
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name, ...names) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}
exports.defineDetailFactory = ((options) => {
    return defineDetailFactoryInternal(options, {});
});
exports.defineDetailFactory.withTransientFields = defaultTransientFieldValues => options => defineDetailFactoryInternal(options, defaultTransientFieldValues);
function isDetailPicturedetailFactory(x) {
    return x?._factoryFor === "Detail";
}
function autoGenerateDetailPictureScalarsOrEnums({ seq }) {
    return {
        type: "S",
        number: (0, internal_1.getScalarFieldValueGenerator)().Int({ modelName: "DetailPicture", fieldName: "number", isId: true, isUnique: false, seq })
    };
}
function defineDetailPictureFactoryInternal({ defaultData: defaultDataResolver, onAfterBuild, onBeforeCreate, onAfterCreate, traits: traitsDefs = {} }, defaultTransientFieldValues) {
    const getFactoryWithTraits = (traitKeys = []) => {
        const seqKey = {};
        const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
        const screen = (0, internal_1.createScreener)("DetailPicture", modelFieldDefinitions);
        const handleAfterBuild = (0, internal_1.createCallbackChain)([
            onAfterBuild,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterBuild),
        ]);
        const handleBeforeCreate = (0, internal_1.createCallbackChain)([
            ...traitKeys.slice().reverse().map(traitKey => traitsDefs[traitKey]?.onBeforeCreate),
            onBeforeCreate,
        ]);
        const handleAfterCreate = (0, internal_1.createCallbackChain)([
            onAfterCreate,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterCreate),
        ]);
        const build = async (inputData = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateDetailPictureScalarsOrEnums({ seq });
            const resolveValue = (0, internal_1.normalizeResolver)(defaultDataResolver);
            const [transientFields, filteredInputData] = (0, internal_1.destructure)(defaultTransientFieldValues, inputData);
            const resolverInput = { seq, ...transientFields };
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = (0, internal_1.normalizeResolver)(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue(resolverInput);
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue(resolverInput));
            const defaultAssociations = {
                detail: isDetailPicturedetailFactory(defaultData.detail) ? {
                    create: await defaultData.detail.build()
                } : defaultData.detail
            };
            const data = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...filteredInputData };
            await handleAfterBuild(data, transientFields);
            return data;
        };
        const buildList = (...args) => Promise.all((0, internal_1.normalizeList)(...args).map(data => build(data)));
        const pickForConnect = (inputData) => ({
            type: inputData.type,
            number: inputData.number
        });
        const create = async (inputData = {}) => {
            const [transientFields] = (0, internal_1.destructure)(defaultTransientFieldValues, inputData);
            const data = await build(inputData).then(screen);
            await handleBeforeCreate(data, transientFields);
            const createdData = await getClient().detailPicture.create({ data });
            await handleAfterCreate(createdData, transientFields);
            return createdData;
        };
        const createList = (...args) => Promise.all((0, internal_1.normalizeList)(...args).map(data => create(data)));
        const createForConnect = (inputData = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "DetailPicture",
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name, ...names) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}
exports.defineDetailPictureFactory = ((options) => {
    return defineDetailPictureFactoryInternal(options, {});
});
exports.defineDetailPictureFactory.withTransientFields = defaultTransientFieldValues => options => defineDetailPictureFactoryInternal(options, defaultTransientFieldValues);
