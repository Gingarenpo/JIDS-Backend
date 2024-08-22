import type { Rank } from "@prisma/client";
import type { User } from "@prisma/client";
import type { Pref } from "@prisma/client";
import type { Area } from "@prisma/client";
import type { Car } from "@prisma/client";
import type { Ped } from "@prisma/client";
import type { CarOfIntersection } from "@prisma/client";
import type { PedOfIntersection } from "@prisma/client";
import type { Intersection } from "@prisma/client";
import type { Queue } from "@prisma/client";
import type { Thumbnail } from "@prisma/client";
import type { Detail } from "@prisma/client";
import type { DetailPicture } from "@prisma/client";
import type { IntersectionStatus } from "@prisma/client";
import type { DetailType } from "@prisma/client";
import type { DetailLight } from "@prisma/client";
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
    Queue?: Prisma.QueueCreateNestedManyWithoutUserInput;
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
    unknownStart?: number;
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
    createDate?: Date;
    delFlg?: boolean;
    intersections?: Prisma.CarOfIntersectionCreateNestedManyWithoutCarInput;
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
    createDate?: Date;
    delFlg?: boolean;
    intersections?: Prisma.PedOfIntersectionCreateNestedManyWithoutPedInput;
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
type CarOfIntersectioncarFactory = {
    _factoryFor: "Car";
    build: () => PromiseLike<Prisma.CarCreateNestedOneWithoutIntersectionsInput["create"]>;
};
type CarOfIntersectionintersectionFactory = {
    _factoryFor: "Intersection";
    build: () => PromiseLike<Prisma.IntersectionCreateNestedOneWithoutCarsInput["create"]>;
};
type CarOfIntersectionFactoryDefineInput = {
    car: CarOfIntersectioncarFactory | Prisma.CarCreateNestedOneWithoutIntersectionsInput;
    intersection: CarOfIntersectionintersectionFactory | Prisma.IntersectionCreateNestedOneWithoutCarsInput;
};
type CarOfIntersectionTransientFields = Record<string, unknown> & Partial<Record<keyof CarOfIntersectionFactoryDefineInput, never>>;
type CarOfIntersectionFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<CarOfIntersectionFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<CarOfIntersection, Prisma.CarOfIntersectionCreateInput, TTransients>;
type CarOfIntersectionFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData: Resolver<CarOfIntersectionFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: string | symbol]: CarOfIntersectionFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<CarOfIntersection, Prisma.CarOfIntersectionCreateInput, TTransients>;
type CarOfIntersectionTraitKeys<TOptions extends CarOfIntersectionFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;
export interface CarOfIntersectionFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "CarOfIntersection";
    build(inputData?: Partial<Prisma.CarOfIntersectionCreateInput & TTransients>): PromiseLike<Prisma.CarOfIntersectionCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.CarOfIntersectionCreateInput & TTransients>): PromiseLike<Prisma.CarOfIntersectionCreateInput>;
    buildList(list: readonly Partial<Prisma.CarOfIntersectionCreateInput & TTransients>[]): PromiseLike<Prisma.CarOfIntersectionCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.CarOfIntersectionCreateInput & TTransients>): PromiseLike<Prisma.CarOfIntersectionCreateInput[]>;
    pickForConnect(inputData: CarOfIntersection): Pick<CarOfIntersection, "carCode" | "prefId" | "areaId" | "intersectionId">;
    create(inputData?: Partial<Prisma.CarOfIntersectionCreateInput & TTransients>): PromiseLike<CarOfIntersection>;
    createList(list: readonly Partial<Prisma.CarOfIntersectionCreateInput & TTransients>[]): PromiseLike<CarOfIntersection[]>;
    createList(count: number, item?: Partial<Prisma.CarOfIntersectionCreateInput & TTransients>): PromiseLike<CarOfIntersection[]>;
    createForConnect(inputData?: Partial<Prisma.CarOfIntersectionCreateInput & TTransients>): PromiseLike<Pick<CarOfIntersection, "carCode" | "prefId" | "areaId" | "intersectionId">>;
}
export interface CarOfIntersectionFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends CarOfIntersectionFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): CarOfIntersectionFactoryInterfaceWithoutTraits<TTransients>;
}
interface CarOfIntersectionFactoryBuilder {
    <TOptions extends CarOfIntersectionFactoryDefineOptions>(options: TOptions): CarOfIntersectionFactoryInterface<{}, CarOfIntersectionTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends CarOfIntersectionTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends CarOfIntersectionFactoryDefineOptions<TTransients>>(options: TOptions) => CarOfIntersectionFactoryInterface<TTransients, CarOfIntersectionTraitKeys<TOptions>>;
}
export declare const defineCarOfIntersectionFactory: CarOfIntersectionFactoryBuilder;
type PedOfIntersectionpedFactory = {
    _factoryFor: "Ped";
    build: () => PromiseLike<Prisma.PedCreateNestedOneWithoutIntersectionsInput["create"]>;
};
type PedOfIntersectionintersectionFactory = {
    _factoryFor: "Intersection";
    build: () => PromiseLike<Prisma.IntersectionCreateNestedOneWithoutPedsInput["create"]>;
};
type PedOfIntersectionFactoryDefineInput = {
    ped: PedOfIntersectionpedFactory | Prisma.PedCreateNestedOneWithoutIntersectionsInput;
    intersection: PedOfIntersectionintersectionFactory | Prisma.IntersectionCreateNestedOneWithoutPedsInput;
};
type PedOfIntersectionTransientFields = Record<string, unknown> & Partial<Record<keyof PedOfIntersectionFactoryDefineInput, never>>;
type PedOfIntersectionFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<PedOfIntersectionFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<PedOfIntersection, Prisma.PedOfIntersectionCreateInput, TTransients>;
type PedOfIntersectionFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData: Resolver<PedOfIntersectionFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: string | symbol]: PedOfIntersectionFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<PedOfIntersection, Prisma.PedOfIntersectionCreateInput, TTransients>;
type PedOfIntersectionTraitKeys<TOptions extends PedOfIntersectionFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;
export interface PedOfIntersectionFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "PedOfIntersection";
    build(inputData?: Partial<Prisma.PedOfIntersectionCreateInput & TTransients>): PromiseLike<Prisma.PedOfIntersectionCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.PedOfIntersectionCreateInput & TTransients>): PromiseLike<Prisma.PedOfIntersectionCreateInput>;
    buildList(list: readonly Partial<Prisma.PedOfIntersectionCreateInput & TTransients>[]): PromiseLike<Prisma.PedOfIntersectionCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.PedOfIntersectionCreateInput & TTransients>): PromiseLike<Prisma.PedOfIntersectionCreateInput[]>;
    pickForConnect(inputData: PedOfIntersection): Pick<PedOfIntersection, "pedCode" | "prefId" | "areaId" | "intersectionId">;
    create(inputData?: Partial<Prisma.PedOfIntersectionCreateInput & TTransients>): PromiseLike<PedOfIntersection>;
    createList(list: readonly Partial<Prisma.PedOfIntersectionCreateInput & TTransients>[]): PromiseLike<PedOfIntersection[]>;
    createList(count: number, item?: Partial<Prisma.PedOfIntersectionCreateInput & TTransients>): PromiseLike<PedOfIntersection[]>;
    createForConnect(inputData?: Partial<Prisma.PedOfIntersectionCreateInput & TTransients>): PromiseLike<Pick<PedOfIntersection, "pedCode" | "prefId" | "areaId" | "intersectionId">>;
}
export interface PedOfIntersectionFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends PedOfIntersectionFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): PedOfIntersectionFactoryInterfaceWithoutTraits<TTransients>;
}
interface PedOfIntersectionFactoryBuilder {
    <TOptions extends PedOfIntersectionFactoryDefineOptions>(options: TOptions): PedOfIntersectionFactoryInterface<{}, PedOfIntersectionTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends PedOfIntersectionTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends PedOfIntersectionFactoryDefineOptions<TTransients>>(options: TOptions) => PedOfIntersectionFactoryInterface<TTransients, PedOfIntersectionTraitKeys<TOptions>>;
}
export declare const definePedOfIntersectionFactory: PedOfIntersectionFactoryBuilder;
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
    status?: IntersectionStatus;
    road?: string | null;
    name?: string | null;
    sign?: string | null;
    isOfficialName?: boolean;
    decideYear?: number | null;
    operationYear?: number | null;
    refreshYear?: number | null;
    rover?: number;
    sound?: boolean;
    comment?: string | null;
    area: IntersectionareaFactory | Prisma.AreaCreateNestedOneWithoutIntersectionInput;
    cars?: Prisma.CarOfIntersectionCreateNestedManyWithoutIntersectionInput;
    peds?: Prisma.PedOfIntersectionCreateNestedManyWithoutIntersectionInput;
    parent?: IntersectionparentFactory | Prisma.IntersectionCreateNestedOneWithoutChildInput;
    child?: Prisma.IntersectionCreateNestedManyWithoutParentInput;
    thumbnails?: Prisma.ThumbnailCreateNestedManyWithoutIntersectionInput;
    details?: Prisma.DetailCreateNestedManyWithoutIntersectionInput;
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
    pickForConnect(inputData: Intersection): Pick<Intersection, "prefId" | "areaId" | "id">;
    create(inputData?: Partial<Prisma.IntersectionCreateInput & TTransients>): PromiseLike<Intersection>;
    createList(list: readonly Partial<Prisma.IntersectionCreateInput & TTransients>[]): PromiseLike<Intersection[]>;
    createList(count: number, item?: Partial<Prisma.IntersectionCreateInput & TTransients>): PromiseLike<Intersection[]>;
    createForConnect(inputData?: Partial<Prisma.IntersectionCreateInput & TTransients>): PromiseLike<Pick<Intersection, "prefId" | "areaId" | "id">>;
}
export interface IntersectionFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends IntersectionFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): IntersectionFactoryInterfaceWithoutTraits<TTransients>;
}
interface IntersectionFactoryBuilder {
    <TOptions extends IntersectionFactoryDefineOptions>(options: TOptions): IntersectionFactoryInterface<{}, IntersectionTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends IntersectionTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends IntersectionFactoryDefineOptions<TTransients>>(options: TOptions) => IntersectionFactoryInterface<TTransients, IntersectionTraitKeys<TOptions>>;
}
export declare const defineIntersectionFactory: IntersectionFactoryBuilder;
type QueueuserFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutQueueInput["create"]>;
};
type QueueFactoryDefineInput = {
    id?: string;
    createDate?: Date;
    acceptDate?: Date | null;
    deniedDate?: Date | null;
    exist?: boolean;
    comment?: string | null;
    statusComment?: string | null;
    user: QueueuserFactory | Prisma.UserCreateNestedOneWithoutQueueInput;
    thumbnails?: Prisma.ThumbnailCreateNestedManyWithoutQueueInput;
    details?: Prisma.DetailCreateNestedManyWithoutQueueInput;
};
type QueueTransientFields = Record<string, unknown> & Partial<Record<keyof QueueFactoryDefineInput, never>>;
type QueueFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<QueueFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<Queue, Prisma.QueueCreateInput, TTransients>;
type QueueFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData: Resolver<QueueFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: string | symbol]: QueueFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<Queue, Prisma.QueueCreateInput, TTransients>;
type QueueTraitKeys<TOptions extends QueueFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;
export interface QueueFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "Queue";
    build(inputData?: Partial<Prisma.QueueCreateInput & TTransients>): PromiseLike<Prisma.QueueCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.QueueCreateInput & TTransients>): PromiseLike<Prisma.QueueCreateInput>;
    buildList(list: readonly Partial<Prisma.QueueCreateInput & TTransients>[]): PromiseLike<Prisma.QueueCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.QueueCreateInput & TTransients>): PromiseLike<Prisma.QueueCreateInput[]>;
    pickForConnect(inputData: Queue): Pick<Queue, "id" | "userId">;
    create(inputData?: Partial<Prisma.QueueCreateInput & TTransients>): PromiseLike<Queue>;
    createList(list: readonly Partial<Prisma.QueueCreateInput & TTransients>[]): PromiseLike<Queue[]>;
    createList(count: number, item?: Partial<Prisma.QueueCreateInput & TTransients>): PromiseLike<Queue[]>;
    createForConnect(inputData?: Partial<Prisma.QueueCreateInput & TTransients>): PromiseLike<Pick<Queue, "id" | "userId">>;
}
export interface QueueFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends QueueFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): QueueFactoryInterfaceWithoutTraits<TTransients>;
}
interface QueueFactoryBuilder {
    <TOptions extends QueueFactoryDefineOptions>(options: TOptions): QueueFactoryInterface<{}, QueueTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends QueueTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends QueueFactoryDefineOptions<TTransients>>(options: TOptions) => QueueFactoryInterface<TTransients, QueueTraitKeys<TOptions>>;
}
export declare const defineQueueFactory: QueueFactoryBuilder;
type ThumbnailqueueFactory = {
    _factoryFor: "Queue";
    build: () => PromiseLike<Prisma.QueueCreateNestedOneWithoutThumbnailsInput["create"]>;
};
type ThumbnailintersectionFactory = {
    _factoryFor: "Intersection";
    build: () => PromiseLike<Prisma.IntersectionCreateNestedOneWithoutThumbnailsInput["create"]>;
};
type ThumbnailFactoryDefineInput = {
    takeDate?: Date | null;
    result?: boolean;
    comment?: string | null;
    queue: ThumbnailqueueFactory | Prisma.QueueCreateNestedOneWithoutThumbnailsInput;
    intersection: ThumbnailintersectionFactory | Prisma.IntersectionCreateNestedOneWithoutThumbnailsInput;
};
type ThumbnailTransientFields = Record<string, unknown> & Partial<Record<keyof ThumbnailFactoryDefineInput, never>>;
type ThumbnailFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<ThumbnailFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<Thumbnail, Prisma.ThumbnailCreateInput, TTransients>;
type ThumbnailFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData: Resolver<ThumbnailFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: string | symbol]: ThumbnailFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<Thumbnail, Prisma.ThumbnailCreateInput, TTransients>;
type ThumbnailTraitKeys<TOptions extends ThumbnailFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;
export interface ThumbnailFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "Thumbnail";
    build(inputData?: Partial<Prisma.ThumbnailCreateInput & TTransients>): PromiseLike<Prisma.ThumbnailCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.ThumbnailCreateInput & TTransients>): PromiseLike<Prisma.ThumbnailCreateInput>;
    buildList(list: readonly Partial<Prisma.ThumbnailCreateInput & TTransients>[]): PromiseLike<Prisma.ThumbnailCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.ThumbnailCreateInput & TTransients>): PromiseLike<Prisma.ThumbnailCreateInput[]>;
    pickForConnect(inputData: Thumbnail): Pick<Thumbnail, "id">;
    create(inputData?: Partial<Prisma.ThumbnailCreateInput & TTransients>): PromiseLike<Thumbnail>;
    createList(list: readonly Partial<Prisma.ThumbnailCreateInput & TTransients>[]): PromiseLike<Thumbnail[]>;
    createList(count: number, item?: Partial<Prisma.ThumbnailCreateInput & TTransients>): PromiseLike<Thumbnail[]>;
    createForConnect(inputData?: Partial<Prisma.ThumbnailCreateInput & TTransients>): PromiseLike<Pick<Thumbnail, "id">>;
}
export interface ThumbnailFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends ThumbnailFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): ThumbnailFactoryInterfaceWithoutTraits<TTransients>;
}
interface ThumbnailFactoryBuilder {
    <TOptions extends ThumbnailFactoryDefineOptions>(options: TOptions): ThumbnailFactoryInterface<{}, ThumbnailTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends ThumbnailTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends ThumbnailFactoryDefineOptions<TTransients>>(options: TOptions) => ThumbnailFactoryInterface<TTransients, ThumbnailTraitKeys<TOptions>>;
}
export declare const defineThumbnailFactory: ThumbnailFactoryBuilder;
type DetailqueueFactory = {
    _factoryFor: "Queue";
    build: () => PromiseLike<Prisma.QueueCreateNestedOneWithoutDetailsInput["create"]>;
};
type DetailintersectionFactory = {
    _factoryFor: "Intersection";
    build: () => PromiseLike<Prisma.IntersectionCreateNestedOneWithoutDetailsInput["create"]>;
};
type DetailFactoryDefineInput = {
    takeDate?: Date | null;
    comment?: string | null;
    memo?: string | null;
    queue: DetailqueueFactory | Prisma.QueueCreateNestedOneWithoutDetailsInput;
    intersection: DetailintersectionFactory | Prisma.IntersectionCreateNestedOneWithoutDetailsInput;
    pictures?: Prisma.DetailPictureCreateNestedManyWithoutDetailInput;
};
type DetailTransientFields = Record<string, unknown> & Partial<Record<keyof DetailFactoryDefineInput, never>>;
type DetailFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<DetailFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<Detail, Prisma.DetailCreateInput, TTransients>;
type DetailFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData: Resolver<DetailFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: string | symbol]: DetailFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<Detail, Prisma.DetailCreateInput, TTransients>;
type DetailTraitKeys<TOptions extends DetailFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;
export interface DetailFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "Detail";
    build(inputData?: Partial<Prisma.DetailCreateInput & TTransients>): PromiseLike<Prisma.DetailCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.DetailCreateInput & TTransients>): PromiseLike<Prisma.DetailCreateInput>;
    buildList(list: readonly Partial<Prisma.DetailCreateInput & TTransients>[]): PromiseLike<Prisma.DetailCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.DetailCreateInput & TTransients>): PromiseLike<Prisma.DetailCreateInput[]>;
    pickForConnect(inputData: Detail): Pick<Detail, "id">;
    create(inputData?: Partial<Prisma.DetailCreateInput & TTransients>): PromiseLike<Detail>;
    createList(list: readonly Partial<Prisma.DetailCreateInput & TTransients>[]): PromiseLike<Detail[]>;
    createList(count: number, item?: Partial<Prisma.DetailCreateInput & TTransients>): PromiseLike<Detail[]>;
    createForConnect(inputData?: Partial<Prisma.DetailCreateInput & TTransients>): PromiseLike<Pick<Detail, "id">>;
}
export interface DetailFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends DetailFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): DetailFactoryInterfaceWithoutTraits<TTransients>;
}
interface DetailFactoryBuilder {
    <TOptions extends DetailFactoryDefineOptions>(options: TOptions): DetailFactoryInterface<{}, DetailTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends DetailTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends DetailFactoryDefineOptions<TTransients>>(options: TOptions) => DetailFactoryInterface<TTransients, DetailTraitKeys<TOptions>>;
}
export declare const defineDetailFactory: DetailFactoryBuilder;
type DetailPicturedetailFactory = {
    _factoryFor: "Detail";
    build: () => PromiseLike<Prisma.DetailCreateNestedOneWithoutPicturesInput["create"]>;
};
type DetailPictureFactoryDefineInput = {
    type?: DetailType;
    number?: number;
    light?: DetailLight | null;
    subNumber?: number | null;
    plate?: boolean;
    detail: DetailPicturedetailFactory | Prisma.DetailCreateNestedOneWithoutPicturesInput;
};
type DetailPictureTransientFields = Record<string, unknown> & Partial<Record<keyof DetailPictureFactoryDefineInput, never>>;
type DetailPictureFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<DetailPictureFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<DetailPicture, Prisma.DetailPictureCreateInput, TTransients>;
type DetailPictureFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData: Resolver<DetailPictureFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: string | symbol]: DetailPictureFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<DetailPicture, Prisma.DetailPictureCreateInput, TTransients>;
type DetailPictureTraitKeys<TOptions extends DetailPictureFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;
export interface DetailPictureFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "DetailPicture";
    build(inputData?: Partial<Prisma.DetailPictureCreateInput & TTransients>): PromiseLike<Prisma.DetailPictureCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.DetailPictureCreateInput & TTransients>): PromiseLike<Prisma.DetailPictureCreateInput>;
    buildList(list: readonly Partial<Prisma.DetailPictureCreateInput & TTransients>[]): PromiseLike<Prisma.DetailPictureCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.DetailPictureCreateInput & TTransients>): PromiseLike<Prisma.DetailPictureCreateInput[]>;
    pickForConnect(inputData: DetailPicture): Pick<DetailPicture, "type" | "number">;
    create(inputData?: Partial<Prisma.DetailPictureCreateInput & TTransients>): PromiseLike<DetailPicture>;
    createList(list: readonly Partial<Prisma.DetailPictureCreateInput & TTransients>[]): PromiseLike<DetailPicture[]>;
    createList(count: number, item?: Partial<Prisma.DetailPictureCreateInput & TTransients>): PromiseLike<DetailPicture[]>;
    createForConnect(inputData?: Partial<Prisma.DetailPictureCreateInput & TTransients>): PromiseLike<Pick<DetailPicture, "type" | "number">>;
}
export interface DetailPictureFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends DetailPictureFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): DetailPictureFactoryInterfaceWithoutTraits<TTransients>;
}
interface DetailPictureFactoryBuilder {
    <TOptions extends DetailPictureFactoryDefineOptions>(options: TOptions): DetailPictureFactoryInterface<{}, DetailPictureTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends DetailPictureTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends DetailPictureFactoryDefineOptions<TTransients>>(options: TOptions) => DetailPictureFactoryInterface<TTransients, DetailPictureTraitKeys<TOptions>>;
}
export declare const defineDetailPictureFactory: DetailPictureFactoryBuilder;
