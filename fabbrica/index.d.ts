import type { Rank } from "@prisma/client";
import type { User } from "@prisma/client";
import type { Pref } from "@prisma/client";
import type { Area } from "@prisma/client";
import type { Car } from "@prisma/client";
import type { Ped } from "@prisma/client";
import type { Intersection } from "@prisma/client";
import type { Prisma } from "@prisma/client";
import type { Resolver } from "@quramy/prisma-fabbrica/lib/internal";
export { resetSequence, registerScalarFieldValueGenerator, resetScalarFieldValueGenerator } from "@quramy/prisma-fabbrica/lib/internal";
type BuildDataOptions<TTransients extends Record<string, unknown>> = {
    readonly seq: number;
} & TTransients;
type TraitName = string | symbol;
type CallbackDefineOptions<TCreated, TCreateInput, TTransients extends Record<string, unknown>> = {
    onAfterBuild?: (createInput: TCreateInput, transientFields: TTransients) => void | PromiseLike<void>;
    onBeforeCreate?: (createInput: TCreateInput, transientFields: TTransients) => void | PromiseLike<void>;
    onAfterCreate?: (created: TCreated, transientFields: TTransients) => void | PromiseLike<void>;
};
export declare const initialize: (options: import("@quramy/prisma-fabbrica/lib/initialize").InitializeOptions) => void;
type RankFactoryDefineInput = {
    id?: number;
    name?: string;
    needScore?: number;
    users?: Prisma.UserCreateNestedManyWithoutRankInput;
};
type RankTransientFields = Record<string, unknown> & Partial<Record<keyof RankFactoryDefineInput, never>>;
type RankFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<RankFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<Rank, Prisma.RankCreateInput, TTransients>;
type RankFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData?: Resolver<RankFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: TraitName]: RankFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<Rank, Prisma.RankCreateInput, TTransients>;
type RankTraitKeys<TOptions extends RankFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;
export interface RankFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "Rank";
    build(inputData?: Partial<Prisma.RankCreateInput & TTransients>): PromiseLike<Prisma.RankCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.RankCreateInput & TTransients>): PromiseLike<Prisma.RankCreateInput>;
    buildList(list: readonly Partial<Prisma.RankCreateInput & TTransients>[]): PromiseLike<Prisma.RankCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.RankCreateInput & TTransients>): PromiseLike<Prisma.RankCreateInput[]>;
    pickForConnect(inputData: Rank): Pick<Rank, "id">;
    create(inputData?: Partial<Prisma.RankCreateInput & TTransients>): PromiseLike<Rank>;
    createList(list: readonly Partial<Prisma.RankCreateInput & TTransients>[]): PromiseLike<Rank[]>;
    createList(count: number, item?: Partial<Prisma.RankCreateInput & TTransients>): PromiseLike<Rank[]>;
    createForConnect(inputData?: Partial<Prisma.RankCreateInput & TTransients>): PromiseLike<Pick<Rank, "id">>;
}
export interface RankFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends RankFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): RankFactoryInterfaceWithoutTraits<TTransients>;
}
interface RankFactoryBuilder {
    <TOptions extends RankFactoryDefineOptions>(options?: TOptions): RankFactoryInterface<{}, RankTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends RankTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends RankFactoryDefineOptions<TTransients>>(options?: TOptions) => RankFactoryInterface<TTransients, RankTraitKeys<TOptions>>;
}
export declare const defineRankFactory: RankFactoryBuilder;
type UserrankFactory = {
    _factoryFor: "Rank";
    build: () => PromiseLike<Prisma.RankCreateNestedOneWithoutUsersInput["create"]>;
};
type UserFactoryDefineInput = {
    id?: string;
    address?: string;
    name?: string;
    password?: string;
    rank?: UserrankFactory | Prisma.RankCreateNestedOneWithoutUsersInput;
};
type UserTransientFields = Record<string, unknown> & Partial<Record<keyof UserFactoryDefineInput, never>>;
type UserFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<UserFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<User, Prisma.UserCreateInput, TTransients>;
type UserFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData?: Resolver<UserFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: TraitName]: UserFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<User, Prisma.UserCreateInput, TTransients>;
type UserTraitKeys<TOptions extends UserFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;
export interface UserFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "User";
    build(inputData?: Partial<Prisma.UserCreateInput & TTransients>): PromiseLike<Prisma.UserCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.UserCreateInput & TTransients>): PromiseLike<Prisma.UserCreateInput>;
    buildList(list: readonly Partial<Prisma.UserCreateInput & TTransients>[]): PromiseLike<Prisma.UserCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.UserCreateInput & TTransients>): PromiseLike<Prisma.UserCreateInput[]>;
    pickForConnect(inputData: User): Pick<User, "id">;
    create(inputData?: Partial<Prisma.UserCreateInput & TTransients>): PromiseLike<User>;
    createList(list: readonly Partial<Prisma.UserCreateInput & TTransients>[]): PromiseLike<User[]>;
    createList(count: number, item?: Partial<Prisma.UserCreateInput & TTransients>): PromiseLike<User[]>;
    createForConnect(inputData?: Partial<Prisma.UserCreateInput & TTransients>): PromiseLike<Pick<User, "id">>;
}
export interface UserFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends UserFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): UserFactoryInterfaceWithoutTraits<TTransients>;
}
interface UserFactoryBuilder {
    <TOptions extends UserFactoryDefineOptions>(options?: TOptions): UserFactoryInterface<{}, UserTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends UserTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends UserFactoryDefineOptions<TTransients>>(options?: TOptions) => UserFactoryInterface<TTransients, UserTraitKeys<TOptions>>;
}
export declare const defineUserFactory: UserFactoryBuilder;
type PrefFactoryDefineInput = {
    id?: number;
    name?: string;
    area?: Prisma.AreaCreateNestedManyWithoutPrefInput;
};
type PrefTransientFields = Record<string, unknown> & Partial<Record<keyof PrefFactoryDefineInput, never>>;
type PrefFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<PrefFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<Pref, Prisma.PrefCreateInput, TTransients>;
type PrefFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData?: Resolver<PrefFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: TraitName]: PrefFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<Pref, Prisma.PrefCreateInput, TTransients>;
type PrefTraitKeys<TOptions extends PrefFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;
export interface PrefFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "Pref";
    build(inputData?: Partial<Prisma.PrefCreateInput & TTransients>): PromiseLike<Prisma.PrefCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.PrefCreateInput & TTransients>): PromiseLike<Prisma.PrefCreateInput>;
    buildList(list: readonly Partial<Prisma.PrefCreateInput & TTransients>[]): PromiseLike<Prisma.PrefCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.PrefCreateInput & TTransients>): PromiseLike<Prisma.PrefCreateInput[]>;
    pickForConnect(inputData: Pref): Pick<Pref, "id">;
    create(inputData?: Partial<Prisma.PrefCreateInput & TTransients>): PromiseLike<Pref>;
    createList(list: readonly Partial<Prisma.PrefCreateInput & TTransients>[]): PromiseLike<Pref[]>;
    createList(count: number, item?: Partial<Prisma.PrefCreateInput & TTransients>): PromiseLike<Pref[]>;
    createForConnect(inputData?: Partial<Prisma.PrefCreateInput & TTransients>): PromiseLike<Pick<Pref, "id">>;
}
export interface PrefFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends PrefFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): PrefFactoryInterfaceWithoutTraits<TTransients>;
}
interface PrefFactoryBuilder {
    <TOptions extends PrefFactoryDefineOptions>(options?: TOptions): PrefFactoryInterface<{}, PrefTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends PrefTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends PrefFactoryDefineOptions<TTransients>>(options?: TOptions) => PrefFactoryInterface<TTransients, PrefTraitKeys<TOptions>>;
}
export declare const definePrefFactory: PrefFactoryBuilder;
type AreaprefFactory = {
    _factoryFor: "Pref";
    build: () => PromiseLike<Prisma.PrefCreateNestedOneWithoutAreaInput["create"]>;
};
type AreaFactoryDefineInput = {
    id?: number;
    name?: string;
    description?: string | null;
    area?: (Prisma.Decimal | Prisma.DecimalJsLike | string) | null;
    pref: AreaprefFactory | Prisma.PrefCreateNestedOneWithoutAreaInput;
    intersection?: Prisma.IntersectionCreateNestedManyWithoutAreaInput;
};
type AreaTransientFields = Record<string, unknown> & Partial<Record<keyof AreaFactoryDefineInput, never>>;
type AreaFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<AreaFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<Area, Prisma.AreaCreateInput, TTransients>;
type AreaFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData: Resolver<AreaFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: string | symbol]: AreaFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<Area, Prisma.AreaCreateInput, TTransients>;
type AreaTraitKeys<TOptions extends AreaFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;
export interface AreaFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "Area";
    build(inputData?: Partial<Prisma.AreaCreateInput & TTransients>): PromiseLike<Prisma.AreaCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.AreaCreateInput & TTransients>): PromiseLike<Prisma.AreaCreateInput>;
    buildList(list: readonly Partial<Prisma.AreaCreateInput & TTransients>[]): PromiseLike<Prisma.AreaCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.AreaCreateInput & TTransients>): PromiseLike<Prisma.AreaCreateInput[]>;
    pickForConnect(inputData: Area): Pick<Area, "prefId" | "id">;
    create(inputData?: Partial<Prisma.AreaCreateInput & TTransients>): PromiseLike<Area>;
    createList(list: readonly Partial<Prisma.AreaCreateInput & TTransients>[]): PromiseLike<Area[]>;
    createList(count: number, item?: Partial<Prisma.AreaCreateInput & TTransients>): PromiseLike<Area[]>;
    createForConnect(inputData?: Partial<Prisma.AreaCreateInput & TTransients>): PromiseLike<Pick<Area, "prefId" | "id">>;
}
export interface AreaFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends AreaFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): AreaFactoryInterfaceWithoutTraits<TTransients>;
}
interface AreaFactoryBuilder {
    <TOptions extends AreaFactoryDefineOptions>(options: TOptions): AreaFactoryInterface<{}, AreaTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends AreaTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends AreaFactoryDefineOptions<TTransients>>(options: TOptions) => AreaFactoryInterface<TTransients, AreaTraitKeys<TOptions>>;
}
export declare const defineAreaFactory: AreaFactoryBuilder;
type CarFactoryDefineInput = {
    code?: string;
    maker?: string;
    name?: string;
    description?: string | null;
    comment?: string | null;
    LED?: boolean | null;
};
type CarTransientFields = Record<string, unknown> & Partial<Record<keyof CarFactoryDefineInput, never>>;
type CarFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<CarFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<Car, Prisma.CarCreateInput, TTransients>;
type CarFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData?: Resolver<CarFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: TraitName]: CarFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<Car, Prisma.CarCreateInput, TTransients>;
type CarTraitKeys<TOptions extends CarFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;
export interface CarFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "Car";
    build(inputData?: Partial<Prisma.CarCreateInput & TTransients>): PromiseLike<Prisma.CarCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.CarCreateInput & TTransients>): PromiseLike<Prisma.CarCreateInput>;
    buildList(list: readonly Partial<Prisma.CarCreateInput & TTransients>[]): PromiseLike<Prisma.CarCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.CarCreateInput & TTransients>): PromiseLike<Prisma.CarCreateInput[]>;
    pickForConnect(inputData: Car): Pick<Car, "code">;
    create(inputData?: Partial<Prisma.CarCreateInput & TTransients>): PromiseLike<Car>;
    createList(list: readonly Partial<Prisma.CarCreateInput & TTransients>[]): PromiseLike<Car[]>;
    createList(count: number, item?: Partial<Prisma.CarCreateInput & TTransients>): PromiseLike<Car[]>;
    createForConnect(inputData?: Partial<Prisma.CarCreateInput & TTransients>): PromiseLike<Pick<Car, "code">>;
}
export interface CarFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends CarFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): CarFactoryInterfaceWithoutTraits<TTransients>;
}
interface CarFactoryBuilder {
    <TOptions extends CarFactoryDefineOptions>(options?: TOptions): CarFactoryInterface<{}, CarTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends CarTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends CarFactoryDefineOptions<TTransients>>(options?: TOptions) => CarFactoryInterface<TTransients, CarTraitKeys<TOptions>>;
}
export declare const defineCarFactory: CarFactoryBuilder;
type PedFactoryDefineInput = {
    code?: string;
    maker?: string;
    name?: string;
    description?: string | null;
    comment?: string | null;
    LED?: boolean | null;
};
type PedTransientFields = Record<string, unknown> & Partial<Record<keyof PedFactoryDefineInput, never>>;
type PedFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<PedFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<Ped, Prisma.PedCreateInput, TTransients>;
type PedFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData?: Resolver<PedFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: TraitName]: PedFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<Ped, Prisma.PedCreateInput, TTransients>;
type PedTraitKeys<TOptions extends PedFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;
export interface PedFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "Ped";
    build(inputData?: Partial<Prisma.PedCreateInput & TTransients>): PromiseLike<Prisma.PedCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.PedCreateInput & TTransients>): PromiseLike<Prisma.PedCreateInput>;
    buildList(list: readonly Partial<Prisma.PedCreateInput & TTransients>[]): PromiseLike<Prisma.PedCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.PedCreateInput & TTransients>): PromiseLike<Prisma.PedCreateInput[]>;
    pickForConnect(inputData: Ped): Pick<Ped, "code">;
    create(inputData?: Partial<Prisma.PedCreateInput & TTransients>): PromiseLike<Ped>;
    createList(list: readonly Partial<Prisma.PedCreateInput & TTransients>[]): PromiseLike<Ped[]>;
    createList(count: number, item?: Partial<Prisma.PedCreateInput & TTransients>): PromiseLike<Ped[]>;
    createForConnect(inputData?: Partial<Prisma.PedCreateInput & TTransients>): PromiseLike<Pick<Ped, "code">>;
}
export interface PedFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends PedFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): PedFactoryInterfaceWithoutTraits<TTransients>;
}
interface PedFactoryBuilder {
    <TOptions extends PedFactoryDefineOptions>(options?: TOptions): PedFactoryInterface<{}, PedTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends PedTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends PedFactoryDefineOptions<TTransients>>(options?: TOptions) => PedFactoryInterface<TTransients, PedTraitKeys<TOptions>>;
}
export declare const definePedFactory: PedFactoryBuilder;
type IntersectionareaFactory = {
    _factoryFor: "Area";
    build: () => PromiseLike<Prisma.AreaCreateNestedOneWithoutIntersectionInput["create"]>;
};
type IntersectionparentFactory = {
    _factoryFor: "Intersection";
    build: () => PromiseLike<Prisma.IntersectionCreateNestedOneWithoutChildInput["create"]>;
};
type IntersectionFactoryDefineInput = {
    id?: string;
    name?: string;
    sign?: string | null;
    isOfficialName?: boolean;
    decideYear?: number | null;
    operationYear?: number | null;
    refreshYear?: number | null;
    rover?: number;
    sound?: boolean;
    comment?: string | null;
    area: IntersectionareaFactory | Prisma.AreaCreateNestedOneWithoutIntersectionInput;
    parent?: IntersectionparentFactory | Prisma.IntersectionCreateNestedOneWithoutChildInput;
    child?: Prisma.IntersectionCreateNestedManyWithoutParentInput;
};
type IntersectionTransientFields = Record<string, unknown> & Partial<Record<keyof IntersectionFactoryDefineInput, never>>;
type IntersectionFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<IntersectionFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<Intersection, Prisma.IntersectionCreateInput, TTransients>;
type IntersectionFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData: Resolver<IntersectionFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: string | symbol]: IntersectionFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<Intersection, Prisma.IntersectionCreateInput, TTransients>;
type IntersectionTraitKeys<TOptions extends IntersectionFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;
export interface IntersectionFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "Intersection";
    build(inputData?: Partial<Prisma.IntersectionCreateInput & TTransients>): PromiseLike<Prisma.IntersectionCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.IntersectionCreateInput & TTransients>): PromiseLike<Prisma.IntersectionCreateInput>;
    buildList(list: readonly Partial<Prisma.IntersectionCreateInput & TTransients>[]): PromiseLike<Prisma.IntersectionCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.IntersectionCreateInput & TTransients>): PromiseLike<Prisma.IntersectionCreateInput[]>;
    pickForConnect(inputData: Intersection): Pick<Intersection, "areaId" | "id">;
    create(inputData?: Partial<Prisma.IntersectionCreateInput & TTransients>): PromiseLike<Intersection>;
    createList(list: readonly Partial<Prisma.IntersectionCreateInput & TTransients>[]): PromiseLike<Intersection[]>;
    createList(count: number, item?: Partial<Prisma.IntersectionCreateInput & TTransients>): PromiseLike<Intersection[]>;
    createForConnect(inputData?: Partial<Prisma.IntersectionCreateInput & TTransients>): PromiseLike<Pick<Intersection, "areaId" | "id">>;
}
export interface IntersectionFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends IntersectionFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): IntersectionFactoryInterfaceWithoutTraits<TTransients>;
}
interface IntersectionFactoryBuilder {
    <TOptions extends IntersectionFactoryDefineOptions>(options: TOptions): IntersectionFactoryInterface<{}, IntersectionTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends IntersectionTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends IntersectionFactoryDefineOptions<TTransients>>(options: TOptions) => IntersectionFactoryInterface<TTransients, IntersectionTraitKeys<TOptions>>;
}
export declare const defineIntersectionFactory: IntersectionFactoryBuilder;
