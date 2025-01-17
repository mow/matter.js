[@project-chip/matter-node.js](../README.md) / [Modules](../modules.md) / [exports/cluster](../modules/exports_cluster.md) / CommandServer

# Class: CommandServer<RequestT, ResponseT\>

[exports/cluster](../modules/exports_cluster.md).CommandServer

## Type parameters

| Name |
| :------ |
| `RequestT` |
| `ResponseT` |

## Table of contents

### Constructors

- [constructor](exports_cluster.CommandServer.md#constructor)

### Properties

- [handler](exports_cluster.CommandServer.md#handler)
- [invokeId](exports_cluster.CommandServer.md#invokeid)
- [name](exports_cluster.CommandServer.md#name)
- [requestSchema](exports_cluster.CommandServer.md#requestschema)
- [responseId](exports_cluster.CommandServer.md#responseid)
- [responseSchema](exports_cluster.CommandServer.md#responseschema)

### Methods

- [invoke](exports_cluster.CommandServer.md#invoke)

## Constructors

### constructor

• **new CommandServer**<`RequestT`, `ResponseT`\>(`invokeId`, `responseId`, `name`, `requestSchema`, `responseSchema`, `handler`)

#### Type parameters

| Name |
| :------ |
| `RequestT` |
| `ResponseT` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `invokeId` | `number` |
| `responseId` | `number` |
| `name` | `string` |
| `requestSchema` | [`TlvSchema`](exports_tlv.TlvSchema.md)<`RequestT`\> |
| `responseSchema` | [`TlvSchema`](exports_tlv.TlvSchema.md)<`ResponseT`\> |
| `handler` | (`request`: `RequestT`, `session`: [`Session`](../interfaces/exports_session.Session.md)<[`MatterDevice`](index.MatterDevice.md)\>, `message`: [`Message`](../interfaces/exports_codec.Message.md), `endpoint`: [`Endpoint`](exports_device.Endpoint.md)) => `ResponseT` \| `Promise`<`ResponseT`\> |

#### Defined in

packages/matter.js/dist/cjs/cluster/server/CommandServer.d.ts:19

## Properties

### handler

• `Protected` `Readonly` **handler**: (`request`: `RequestT`, `session`: [`Session`](../interfaces/exports_session.Session.md)<[`MatterDevice`](index.MatterDevice.md)\>, `message`: [`Message`](../interfaces/exports_codec.Message.md), `endpoint`: [`Endpoint`](exports_device.Endpoint.md)) => `ResponseT` \| `Promise`<`ResponseT`\>

#### Type declaration

▸ (`request`, `session`, `message`, `endpoint`): `ResponseT` \| `Promise`<`ResponseT`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `RequestT` |
| `session` | [`Session`](../interfaces/exports_session.Session.md)<[`MatterDevice`](index.MatterDevice.md)\> |
| `message` | [`Message`](../interfaces/exports_codec.Message.md) |
| `endpoint` | [`Endpoint`](exports_device.Endpoint.md) |

##### Returns

`ResponseT` \| `Promise`<`ResponseT`\>

#### Defined in

packages/matter.js/dist/cjs/cluster/server/CommandServer.d.ts:18

___

### invokeId

• `Readonly` **invokeId**: `number`

#### Defined in

packages/matter.js/dist/cjs/cluster/server/CommandServer.d.ts:13

___

### name

• `Readonly` **name**: `string`

#### Defined in

packages/matter.js/dist/cjs/cluster/server/CommandServer.d.ts:15

___

### requestSchema

• `Readonly` **requestSchema**: [`TlvSchema`](exports_tlv.TlvSchema.md)<`RequestT`\>

#### Defined in

packages/matter.js/dist/cjs/cluster/server/CommandServer.d.ts:16

___

### responseId

• `Readonly` **responseId**: `number`

#### Defined in

packages/matter.js/dist/cjs/cluster/server/CommandServer.d.ts:14

___

### responseSchema

• `Readonly` **responseSchema**: [`TlvSchema`](exports_tlv.TlvSchema.md)<`ResponseT`\>

#### Defined in

packages/matter.js/dist/cjs/cluster/server/CommandServer.d.ts:17

## Methods

### invoke

▸ **invoke**(`session`, `args`, `message`, `endpoint`): `Promise`<{ `code`: [`StatusCode`](../enums/exports_interaction.StatusCode.md) ; `response`: [`TlvStream`](../modules/exports_tlv.md#tlvstream) ; `responseId`: `number`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `session` | [`Session`](../interfaces/exports_session.Session.md)<[`MatterDevice`](index.MatterDevice.md)\> |
| `args` | [`TlvStream`](../modules/exports_tlv.md#tlvstream) |
| `message` | [`Message`](../interfaces/exports_codec.Message.md) |
| `endpoint` | [`Endpoint`](exports_device.Endpoint.md) |

#### Returns

`Promise`<{ `code`: [`StatusCode`](../enums/exports_interaction.StatusCode.md) ; `response`: [`TlvStream`](../modules/exports_tlv.md#tlvstream) ; `responseId`: `number`  }\>

#### Defined in

packages/matter.js/dist/cjs/cluster/server/CommandServer.d.ts:20
