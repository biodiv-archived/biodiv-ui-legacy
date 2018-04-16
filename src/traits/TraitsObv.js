import React, {Component} from 'react';
import axios from 'axios';
import $ from 'jquery'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import './TraitsObvStyle.css'

import { Config } from '../Config';
import AuthUtils from '../auth/AuthUtils.js';
import ModalPopup from '../auth/Modal.js';
import DatePicker from '../util/traitUtils/RangeDate.js'

const testTraitData={
success: true,
status: 200,
msg: "",
model: {
instanceList: [
{
id: 3,
name: "Life form",
isParticipatory: false,
description: null,
createdOn: "2017-12-21T06:54:06Z",
source: null,
icon: ",",
ontologyUrl: null,
field: {
concept: "Overview",
category: "Brief",
description: "A general description, with any kind of information about the taxon. Its main goal is summarize the most relevant or attractive characteristics of this taxon to the general public.",
language: {
id: 1,
name: "English",
threeLetterCode: "eng",
twoLetterCode: null
}
},
taxon: [
{
id: 997,
name: "Plantae",
canonicalForm: "Plantae",
italicisedForm: "<i>Plantae</i>",
rank: "Kingdom",
nameStatus: "accepted",
sourceDatabase: "",
defaultHierarchy: [
{
id: 997,
lid: 997,
rank: 0,
name: "Plantae",
canonical_form: "Plantae"
}
],
group: null,
parentName: null,
position: "Clean",
speciesId: null
}
],
traitTypes: {
enumType: "species.trait.Trait$TraitTypes",
name: "SINGLE_CATEGORICAL"
},
dataTypes: {
enumType: "species.trait.Trait$DataTypes",
name: "STRING"
},
units: null,
values: [
{
id: 15,
value: "Annual",
description: "",
icon: "/2b3c1c78-ebc7-4cbd-bc4f-933adc9e3dd6/resources/320.png",
source: ""
},
{
id: 16,
value: "Perennial",
description: "",
icon: "/2b3c1c78-ebc7-4cbd-bc4f-933adc9e3dd6/resources/408.png",
source: ""
},
{
id: 17,
value: "Deciduous shrub",
description: "",
icon: "/2b3c1c78-ebc7-4cbd-bc4f-933adc9e3dd6/resources/366.png",
source: ""
},
{
id: 18,
value: "Orchid",
description: "",
icon: "/2b3c1c78-ebc7-4cbd-bc4f-933adc9e3dd6/resources/275.png",
source: ""
},
{
id: 19,
value: "Fern",
description: "",
icon: "/2b3c1c78-ebc7-4cbd-bc4f-933adc9e3dd6/resources/240.png",
source: ""
},
{
id: 20,
value: "Evergreen shrub",
description: "",
icon: "/2b3c1c78-ebc7-4cbd-bc4f-933adc9e3dd6/resources/761.png",
source: ""
}
]
},
{
id: 5,
name: "Sex",
isParticipatory: true,
description: null,
createdOn: "2017-12-28T11:32:42Z",
source: null,
icon: "/9ca129f5-9019-4364-acd6-d0de9528b604/resources/589.png,/9e912795-eb03-4c14-9985-e84481d4bdea/resources/653.png",
ontologyUrl: null,
field: {
concept: "Natural History",
category: "Reproduction",
description: "Describes reproductive physiology and behavior, including mating and life history variables. Includes cues, strategies, restraints, rates.",
language: {
id: 1,
name: "English",
threeLetterCode: "eng",
twoLetterCode: null
}
},
taxon: [
{
id: 1,
name: "Animalia",
canonicalForm: "Animalia",
italicisedForm: "<i>Animalia</i>",
rank: "Kingdom",
nameStatus: "accepted",
sourceDatabase: "",
defaultHierarchy: [
{
id: 1,
lid: 1,
rank: 0,
name: "Animalia",
canonical_form: "Animalia"
}
],
group: null,
parentName: null,
position: "Clean",
speciesId: null
}
],
traitTypes: {
enumType: "species.trait.Trait$TraitTypes",
name: "SINGLE_CATEGORICAL"
},
dataTypes: {
enumType: "species.trait.Trait$DataTypes",
name: "STRING"
},
units: null,
values: [
{
id: 26,
value: "Female",
description: "",
icon: "/9ca129f5-9019-4364-acd6-d0de9528b604/resources/589.png",
source: ""
},
{
id: 25,
value: "Male",
description: "",
icon: "/9e912795-eb03-4c14-9985-e84481d4bdea/resources/653.png",
source: ""
}
]
},
{
id: 6,
name: "Fish Size (Cm)",
isParticipatory: false,
description: "Max length of Fishes in centimeters",
createdOn: "2017-12-29T10:11:43Z",
source: null,
icon: null,
ontologyUrl: null,
field: {
concept: "Natural History",
category: "Size",
description: "Describes average size, max, range; type of size (perimeter, length, volume, weight ...).",
language: {
id: 1,
name: "English",
threeLetterCode: "eng",
twoLetterCode: null
}
},
taxon: [
{
id: 5066,
name: "Actinopterygii",
canonicalForm: "Actinopterygii",
italicisedForm: "<i>Actinopterygii</i>",
rank: "Class",
nameStatus: "accepted",
sourceDatabase: "",
defaultHierarchy: [
{
id: 1,
lid: 5066,
rank: 0,
name: "Animalia",
canonical_form: "Animalia"
},
{
id: 71,
lid: 5066,
rank: 1,
name: "Chordata",
canonical_form: "Chordata"
},
{
id: 5066,
lid: 5066,
rank: 2,
name: "Actinopterygii",
canonical_form: "Actinopterygii"
}
],
group: null,
parentName: null,
position: "Clean",
speciesId: null
}
],
traitTypes: {
enumType: "species.trait.Trait$TraitTypes",
name: "RANGE"
},
dataTypes: {
enumType: "species.trait.Trait$DataTypes",
name: "NUMERIC"
},
units: null,
values: [ ]
},
{
id: 7,
name: "Fish Life Stage",
isParticipatory: true,
description: null,
createdOn: "2018-01-08T17:08:54Z",
source: null,
icon: null,
ontologyUrl: null,
field: {
concept: "Natural History",
category: "Life Cycle",
description: "Defines and describes life history of a living organism, meaning the course of obligatory developmental transformations in an organism from fertilised zygote to maturity. It includes stages through which an organism passes, ie, metamorphosis, instars, gametophyte/embryophyte, and, transitions from sessile to mobile forms. Also discusses timing, though morphology of each form would be better placed in the field for Morphology.",
language: {
id: 1,
name: "English",
threeLetterCode: "eng",
twoLetterCode: null
}
},
taxon: [
{
id: 5066,
name: "Actinopterygii",
canonicalForm: "Actinopterygii",
italicisedForm: "<i>Actinopterygii</i>",
rank: "Class",
nameStatus: "accepted",
sourceDatabase: "",
defaultHierarchy: [
{
id: 1,
lid: 5066,
rank: 0,
name: "Animalia",
canonical_form: "Animalia"
},
{
id: 71,
lid: 5066,
rank: 1,
name: "Chordata",
canonical_form: "Chordata"
},
{
id: 5066,
lid: 5066,
rank: 2,
name: "Actinopterygii",
canonical_form: "Actinopterygii"
}
],
group: null,
parentName: null,
position: "Clean",
speciesId: null
}
],
traitTypes: {
enumType: "species.trait.Trait$TraitTypes",
name: "SINGLE_CATEGORICAL"
},
dataTypes: {
enumType: "species.trait.Trait$DataTypes",
name: "STRING"
},
units: null,
values: [
{
id: 27,
value: "Eggs",
description: "",
icon: "/1f3c2476-6520-46b2-aae8-9aa5365ad0de/resources/958.png",
source: ""
},
{
id: 28,
value: "Larva",
description: "",
icon: "/1f3c2476-6520-46b2-aae8-9aa5365ad0de/resources/307.png",
source: ""
},
{
id: 29,
value: "Fry",
description: "",
icon: "/1f3c2476-6520-46b2-aae8-9aa5365ad0de/resources/543.png",
source: ""
},
{
id: 30,
value: "Juvenile",
description: "",
icon: "/1f3c2476-6520-46b2-aae8-9aa5365ad0de/resources/702.png",
source: ""
},
{
id: 31,
value: "Adult",
description: "",
icon: "/1f3c2476-6520-46b2-aae8-9aa5365ad0de/resources/77.png",
source: ""
}
]
},
{
id: 9,
name: "Fish reproductive condition",
isParticipatory: false,
description: null,
createdOn: "2018-02-07T09:31:12Z",
source: null,
icon: null,
ontologyUrl: null,
field: {
concept: "Natural History",
category: "Reproduction",
description: "Describes reproductive physiology and behavior, including mating and life history variables. Includes cues, strategies, restraints, rates.",
language: {
id: 1,
name: "English",
threeLetterCode: "eng",
twoLetterCode: null
}
},
taxon: [
{
id: 5066,
name: "Actinopterygii",
canonicalForm: "Actinopterygii",
italicisedForm: "<i>Actinopterygii</i>",
rank: "Class",
nameStatus: "accepted",
sourceDatabase: "",
defaultHierarchy: [
{
id: 1,
lid: 5066,
rank: 0,
name: "Animalia",
canonical_form: "Animalia"
},
{
id: 71,
lid: 5066,
rank: 1,
name: "Chordata",
canonical_form: "Chordata"
},
{
id: 5066,
lid: 5066,
rank: 2,
name: "Actinopterygii",
canonical_form: "Actinopterygii"
}
],
group: null,
parentName: null,
position: "Clean",
speciesId: null
}
],
traitTypes: {
enumType: "species.trait.Trait$TraitTypes",
name: "SINGLE_CATEGORICAL"
},
dataTypes: {
enumType: "species.trait.Trait$DataTypes",
name: "STRING"
},
units: null,
values: [
{
id: 33,
value: "Immature",
description: "",
icon: "/fcec7294-10f5-4b98-be64-5f7a29014248/resources/294.png",
source: ""
},
{
id: 35,
value: "ripe",
description: "",
icon: "/fcec7294-10f5-4b98-be64-5f7a29014248/resources/966.png",
source: ""
},
{
id: 37,
value: "spent",
description: "",
icon: "/fcec7294-10f5-4b98-be64-5f7a29014248/resources/635.png",
source: ""
},
{
id: 34,
value: "mature",
description: "",
icon: "/fcec7294-10f5-4b98-be64-5f7a29014248/resources/383.png",
source: ""
},
{
id: 36,
value: "ripe running",
description: "",
icon: "/fcec7294-10f5-4b98-be64-5f7a29014248/resources/562.png",
source: ""
}
]
},
{
id: 10,
name: "Fish spawning activity",
isParticipatory: false,
description: null,
createdOn: "2018-02-07T12:33:46Z",
source: null,
icon: "/36b73cac-1963-47c3-9b8e-0ea98dda737a/resources/683.png",
ontologyUrl: null,
field: {
concept: "Natural History",
category: "Reproduction",
description: "Describes reproductive physiology and behavior, including mating and life history variables. Includes cues, strategies, restraints, rates.",
language: {
id: 1,
name: "English",
threeLetterCode: "eng",
twoLetterCode: null
}
},
taxon: [
{
id: 5066,
name: "Actinopterygii",
canonicalForm: "Actinopterygii",
italicisedForm: "<i>Actinopterygii</i>",
rank: "Class",
nameStatus: "accepted",
sourceDatabase: "",
defaultHierarchy: [
{
id: 1,
lid: 5066,
rank: 0,
name: "Animalia",
canonical_form: "Animalia"
},
{
id: 71,
lid: 5066,
rank: 1,
name: "Chordata",
canonical_form: "Chordata"
},
{
id: 5066,
lid: 5066,
rank: 2,
name: "Actinopterygii",
canonical_form: "Actinopterygii"
}
],
group: null,
parentName: null,
position: "Clean",
speciesId: null
}
],
traitTypes: {
enumType: "species.trait.Trait$TraitTypes",
name: "SINGLE_CATEGORICAL"
},
dataTypes: {
enumType: "species.trait.Trait$DataTypes",
name: "STRING"
},
units: null,
values: [
{
id: 39,
value: "Not spawning",
description: "",
icon: "/4c87e5af-49e7-4e52-adce-6adb3d1f57cd/resources/150.png",
source: ""
},
{
id: 38,
value: "Spawning",
description: "",
icon: "/36b73cac-1963-47c3-9b8e-0ea98dda737a/resources/683.png",
source: ""
}
]
},
{
id: 11,
name: "Mean Fish Length",
isParticipatory: false,
description: "Mean in Cm if number of fish is greater than >1",
createdOn: "2018-03-14T14:44:56Z",
source: null,
icon: null,
ontologyUrl: null,
field: {
concept: "Natural History",
category: "Size",
description: "Describes average size, max, range; type of size (perimeter, length, volume, weight ...).",
language: {
id: 1,
name: "English",
threeLetterCode: "eng",
twoLetterCode: null
}
},
taxon: [
{
id: 5066,
name: "Actinopterygii",
canonicalForm: "Actinopterygii",
italicisedForm: "<i>Actinopterygii</i>",
rank: "Class",
nameStatus: "accepted",
sourceDatabase: "",
defaultHierarchy: [
{
id: 1,
lid: 5066,
rank: 0,
name: "Animalia",
canonical_form: "Animalia"
},
{
id: 71,
lid: 5066,
rank: 1,
name: "Chordata",
canonical_form: "Chordata"
},
{
id: 5066,
lid: 5066,
rank: 2,
name: "Actinopterygii",
canonical_form: "Actinopterygii"
}
],
group: null,
parentName: null,
position: "Clean",
speciesId: null
}
],
traitTypes: {
enumType: "species.trait.Trait$TraitTypes",
name: "RANGE"
},
dataTypes: {
enumType: "species.trait.Trait$DataTypes",
name: "NUMERIC"
},
units: null,
values: [ ]
},
{
id: 12,
name: "Maximum Fish Length",
isParticipatory: false,
description: "Maximum Fish Length in Cm",
createdOn: "2018-03-14T14:49:46Z",
source: null,
icon: null,
ontologyUrl: null,
field: {
concept: "Natural History",
category: "Size",
description: "Describes average size, max, range; type of size (perimeter, length, volume, weight ...).",
language: {
id: 1,
name: "English",
threeLetterCode: "eng",
twoLetterCode: null
}
},
taxon: [
{
id: 5066,
name: "Actinopterygii",
canonicalForm: "Actinopterygii",
italicisedForm: "<i>Actinopterygii</i>",
rank: "Class",
nameStatus: "accepted",
sourceDatabase: "",
defaultHierarchy: [
{
id: 1,
lid: 5066,
rank: 0,
name: "Animalia",
canonical_form: "Animalia"
},
{
id: 71,
lid: 5066,
rank: 1,
name: "Chordata",
canonical_form: "Chordata"
},
{
id: 5066,
lid: 5066,
rank: 2,
name: "Actinopterygii",
canonical_form: "Actinopterygii"
}
],
group: null,
parentName: null,
position: "Clean",
speciesId: null
}
],
traitTypes: {
enumType: "species.trait.Trait$TraitTypes",
name: "RANGE"
},
dataTypes: {
enumType: "species.trait.Trait$DataTypes",
name: "NUMERIC"
},
units: null,
values: [ ]
},
{
id: 13,
name: "Fish Habitat Type",
isParticipatory: false,
description: "Species habitat preferences.",
createdOn: "2018-03-14T14:54:29Z",
source: null,
icon: null,
ontologyUrl: null,
field: {
concept: "Habitat and Distribution",
category: "General Habitat",
description: "General description of the sites where the species is found (ecosystem, forest, environment or microhabitat). Includes realm (e.g Terrestrial etc) and climatic information (e.g Boreal); also includes requirements and tolerances; horizontal and vertical (altitudinal) distribution. Also includes information referring to territorial extension of the individual or group in terms of its activities (feeding, mating, etc.), associated mostly to vertebrates.",
language: {
id: 1,
name: "English",
threeLetterCode: "eng",
twoLetterCode: null
}
},
taxon: [
{
id: 5066,
name: "Actinopterygii",
canonicalForm: "Actinopterygii",
italicisedForm: "<i>Actinopterygii</i>",
rank: "Class",
nameStatus: "accepted",
sourceDatabase: "",
defaultHierarchy: [
{
id: 1,
lid: 5066,
rank: 0,
name: "Animalia",
canonical_form: "Animalia"
},
{
id: 71,
lid: 5066,
rank: 1,
name: "Chordata",
canonical_form: "Chordata"
},
{
id: 5066,
lid: 5066,
rank: 2,
name: "Actinopterygii",
canonical_form: "Actinopterygii"
}
],
group: null,
parentName: null,
position: "Clean",
speciesId: null
}
],
traitTypes: {
enumType: "species.trait.Trait$TraitTypes",
name: "SINGLE_CATEGORICAL"
},
dataTypes: {
enumType: "species.trait.Trait$DataTypes",
name: "STRING"
},
units: null,
values: [
{
id: 40,
value: "River",
description: "",
icon: "/855e4399-19c9-423f-b3fd-5c52889f53fd/resources/27.png",
source: ""
},
{
id: 41,
value: "Tributary",
description: "",
icon: "/855e4399-19c9-423f-b3fd-5c52889f53fd/resources/893.png",
source: ""
},
{
id: 42,
value: "Stream",
description: "",
icon: "/855e4399-19c9-423f-b3fd-5c52889f53fd/resources/202.png",
source: ""
},
{
id: 43,
value: "Reservoir",
description: "",
icon: "/855e4399-19c9-423f-b3fd-5c52889f53fd/resources/650.png",
source: ""
},
{
id: 44,
value: "Lake",
description: "",
icon: "/855e4399-19c9-423f-b3fd-5c52889f53fd/resources/4.png",
source: ""
},
{
id: 45,
value: "Floodplain.",
description: "",
icon: "/855e4399-19c9-423f-b3fd-5c52889f53fd/resources/135.png",
source: ""
}
]
},
{
id: 14,
name: "Substrate",
isParticipatory: false,
description: null,
createdOn: "2018-03-14T15:01:44Z",
source: null,
icon: null,
ontologyUrl: null,
field: {
concept: "Habitat and Distribution",
category: "General Habitat",
description: "General description of the sites where the species is found (ecosystem, forest, environment or microhabitat). Includes realm (e.g Terrestrial etc) and climatic information (e.g Boreal); also includes requirements and tolerances; horizontal and vertical (altitudinal) distribution. Also includes information referring to territorial extension of the individual or group in terms of its activities (feeding, mating, etc.), associated mostly to vertebrates.",
language: {
id: 1,
name: "English",
threeLetterCode: "eng",
twoLetterCode: null
}
},
taxon: [
{
id: 5066,
name: "Actinopterygii",
canonicalForm: "Actinopterygii",
italicisedForm: "<i>Actinopterygii</i>",
rank: "Class",
nameStatus: "accepted",
sourceDatabase: "",
defaultHierarchy: [
{
id: 1,
lid: 5066,
rank: 0,
name: "Animalia",
canonical_form: "Animalia"
},
{
id: 71,
lid: 5066,
rank: 1,
name: "Chordata",
canonical_form: "Chordata"
},
{
id: 5066,
lid: 5066,
rank: 2,
name: "Actinopterygii",
canonical_form: "Actinopterygii"
}
],
group: null,
parentName: null,
position: "Clean",
speciesId: null
}
],
traitTypes: {
enumType: "species.trait.Trait$TraitTypes",
name: "SINGLE_CATEGORICAL"
},
dataTypes: {
enumType: "species.trait.Trait$DataTypes",
name: "STRING"
},
units: null,
values: [
{
id: 46,
value: "Rock",
description: "",
icon: "/72307cde-40e2-41f4-9401-158d2ce1591f/resources/987.png",
source: ""
},
{
id: 47,
value: "Sand",
description: "",
icon: "/72307cde-40e2-41f4-9401-158d2ce1591f/resources/359.png",
source: ""
},
{
id: 48,
value: "Gravel",
description: "",
icon: "/72307cde-40e2-41f4-9401-158d2ce1591f/resources/493.png",
source: ""
},
{
id: 49,
value: "Pebbles",
description: "",
icon: "/72307cde-40e2-41f4-9401-158d2ce1591f/resources/18.png",
source: ""
},
{
id: 50,
value: "Mud",
description: "",
icon: "/72307cde-40e2-41f4-9401-158d2ce1591f/resources/609.png",
source: ""
}
]
},
{
id: 15,
name: "Water Depth",
isParticipatory: false,
description: "Water depth in meters",
createdOn: "2018-03-14T15:34:52Z",
source: null,
icon: null,
ontologyUrl: null,
field: {
concept: "Habitat and Distribution",
category: "General Habitat",
description: "General description of the sites where the species is found (ecosystem, forest, environment or microhabitat). Includes realm (e.g Terrestrial etc) and climatic information (e.g Boreal); also includes requirements and tolerances; horizontal and vertical (altitudinal) distribution. Also includes information referring to territorial extension of the individual or group in terms of its activities (feeding, mating, etc.), associated mostly to vertebrates.",
language: {
id: 1,
name: "English",
threeLetterCode: "eng",
twoLetterCode: null
}
},
taxon: [
{
id: 5066,
name: "Actinopterygii",
canonicalForm: "Actinopterygii",
italicisedForm: "<i>Actinopterygii</i>",
rank: "Class",
nameStatus: "accepted",
sourceDatabase: "",
defaultHierarchy: [
{
id: 1,
lid: 5066,
rank: 0,
name: "Animalia",
canonical_form: "Animalia"
},
{
id: 71,
lid: 5066,
rank: 1,
name: "Chordata",
canonical_form: "Chordata"
},
{
id: 5066,
lid: 5066,
rank: 2,
name: "Actinopterygii",
canonical_form: "Actinopterygii"
}
],
group: null,
parentName: null,
position: "Clean",
speciesId: null
}
],
traitTypes: {
enumType: "species.trait.Trait$TraitTypes",
name: "RANGE"
},
dataTypes: {
enumType: "species.trait.Trait$DataTypes",
name: "NUMERIC"
},
units: null,
values: [ ]
},
{
id: 16,
name: "Water Velocity",
isParticipatory: false,
description: "Water velocity measured in m/s",
createdOn: "2018-03-14T15:39:57Z",
source: null,
icon: null,
ontologyUrl: null,
field: {
concept: "Habitat and Distribution",
category: "General Habitat",
description: "General description of the sites where the species is found (ecosystem, forest, environment or microhabitat). Includes realm (e.g Terrestrial etc) and climatic information (e.g Boreal); also includes requirements and tolerances; horizontal and vertical (altitudinal) distribution. Also includes information referring to territorial extension of the individual or group in terms of its activities (feeding, mating, etc.), associated mostly to vertebrates.",
language: {
id: 1,
name: "English",
threeLetterCode: "eng",
twoLetterCode: null
}
},
taxon: [
{
id: 5066,
name: "Actinopterygii",
canonicalForm: "Actinopterygii",
italicisedForm: "<i>Actinopterygii</i>",
rank: "Class",
nameStatus: "accepted",
sourceDatabase: "",
defaultHierarchy: [
{
id: 1,
lid: 5066,
rank: 0,
name: "Animalia",
canonical_form: "Animalia"
},
{
id: 71,
lid: 5066,
rank: 1,
name: "Chordata",
canonical_form: "Chordata"
},
{
id: 5066,
lid: 5066,
rank: 2,
name: "Actinopterygii",
canonical_form: "Actinopterygii"
}
],
group: null,
parentName: null,
position: "Clean",
speciesId: null
}
],
traitTypes: {
enumType: "species.trait.Trait$TraitTypes",
name: "RANGE"
},
dataTypes: {
enumType: "species.trait.Trait$DataTypes",
name: "NUMERIC"
},
units: null,
values: [ ]
},
{
id: 17,
name: "Flow",
isParticipatory: false,
description: "Flow in meter cube per second",
createdOn: "2018-03-14T15:43:14Z",
source: null,
icon: null,
ontologyUrl: null,
field: {
concept: "Habitat and Distribution",
category: "General Habitat",
description: "General description of the sites where the species is found (ecosystem, forest, environment or microhabitat). Includes realm (e.g Terrestrial etc) and climatic information (e.g Boreal); also includes requirements and tolerances; horizontal and vertical (altitudinal) distribution. Also includes information referring to territorial extension of the individual or group in terms of its activities (feeding, mating, etc.), associated mostly to vertebrates.",
language: {
id: 1,
name: "English",
threeLetterCode: "eng",
twoLetterCode: null
}
},
taxon: [
{
id: 5066,
name: "Actinopterygii",
canonicalForm: "Actinopterygii",
italicisedForm: "<i>Actinopterygii</i>",
rank: "Class",
nameStatus: "accepted",
sourceDatabase: "",
defaultHierarchy: [
{
id: 1,
lid: 5066,
rank: 0,
name: "Animalia",
canonical_form: "Animalia"
},
{
id: 71,
lid: 5066,
rank: 1,
name: "Chordata",
canonical_form: "Chordata"
},
{
id: 5066,
lid: 5066,
rank: 2,
name: "Actinopterygii",
canonical_form: "Actinopterygii"
}
],
group: null,
parentName: null,
position: "Clean",
speciesId: null
}
],
traitTypes: {
enumType: "species.trait.Trait$TraitTypes",
name: "RANGE"
},
dataTypes: {
enumType: "species.trait.Trait$DataTypes",
name: "NUMERIC"
},
units: null,
values: [ ]
},
{
id: 18,
name: "Water Temperature",
isParticipatory: false,
description: "Water temperature in degree Celsius",
createdOn: "2018-03-14T15:53:46Z",
source: null,
icon: null,
ontologyUrl: null,
field: {
concept: "Habitat and Distribution",
category: "General Habitat",
description: "General description of the sites where the species is found (ecosystem, forest, environment or microhabitat). Includes realm (e.g Terrestrial etc) and climatic information (e.g Boreal); also includes requirements and tolerances; horizontal and vertical (altitudinal) distribution. Also includes information referring to territorial extension of the individual or group in terms of its activities (feeding, mating, etc.), associated mostly to vertebrates.",
language: {
id: 1,
name: "English",
threeLetterCode: "eng",
twoLetterCode: null
}
},
taxon: [
{
id: 5066,
name: "Actinopterygii",
canonicalForm: "Actinopterygii",
italicisedForm: "<i>Actinopterygii</i>",
rank: "Class",
nameStatus: "accepted",
sourceDatabase: "",
defaultHierarchy: [
{
id: 1,
lid: 5066,
rank: 0,
name: "Animalia",
canonical_form: "Animalia"
},
{
id: 71,
lid: 5066,
rank: 1,
name: "Chordata",
canonical_form: "Chordata"
},
{
id: 5066,
lid: 5066,
rank: 2,
name: "Actinopterygii",
canonical_form: "Actinopterygii"
}
],
group: null,
parentName: null,
position: "Clean",
speciesId: null
}
],
traitTypes: {
enumType: "species.trait.Trait$TraitTypes",
name: "RANGE"
},
dataTypes: {
enumType: "species.trait.Trait$DataTypes",
name: "NUMERIC"
},
units: null,
values: [ ]
},
{
id: 19,
name: "pH",
isParticipatory: false,
description: "pH value between 0-14",
createdOn: "2018-03-14T15:56:53Z",
source: null,
icon: null,
ontologyUrl: null,
field: {
concept: "Habitat and Distribution",
category: "General Habitat",
description: "General description of the sites where the species is found (ecosystem, forest, environment or microhabitat). Includes realm (e.g Terrestrial etc) and climatic information (e.g Boreal); also includes requirements and tolerances; horizontal and vertical (altitudinal) distribution. Also includes information referring to territorial extension of the individual or group in terms of its activities (feeding, mating, etc.), associated mostly to vertebrates.",
language: {
id: 1,
name: "English",
threeLetterCode: "eng",
twoLetterCode: null
}
},
taxon: [
{
id: 5066,
name: "Actinopterygii",
canonicalForm: "Actinopterygii",
italicisedForm: "<i>Actinopterygii</i>",
rank: "Class",
nameStatus: "accepted",
sourceDatabase: "",
defaultHierarchy: [
{
id: 1,
lid: 5066,
rank: 0,
name: "Animalia",
canonical_form: "Animalia"
},
{
id: 71,
lid: 5066,
rank: 1,
name: "Chordata",
canonical_form: "Chordata"
},
{
id: 5066,
lid: 5066,
rank: 2,
name: "Actinopterygii",
canonical_form: "Actinopterygii"
}
],
group: null,
parentName: null,
position: "Clean",
speciesId: null
}
],
traitTypes: {
enumType: "species.trait.Trait$TraitTypes",
name: "RANGE"
},
dataTypes: {
enumType: "species.trait.Trait$DataTypes",
name: "NUMERIC"
},
units: null,
values: [ ]
},
{
id: 20,
name: "Dissolved Oxygen",
isParticipatory: false,
description: "Dissolved oxygen (DO) in milligrams per litre",
createdOn: "2018-03-14T15:59:04Z",
source: null,
icon: null,
ontologyUrl: null,
field: {
concept: "Habitat and Distribution",
category: "General Habitat",
description: "General description of the sites where the species is found (ecosystem, forest, environment or microhabitat). Includes realm (e.g Terrestrial etc) and climatic information (e.g Boreal); also includes requirements and tolerances; horizontal and vertical (altitudinal) distribution. Also includes information referring to territorial extension of the individual or group in terms of its activities (feeding, mating, etc.), associated mostly to vertebrates.",
language: {
id: 1,
name: "English",
threeLetterCode: "eng",
twoLetterCode: null
}
},
taxon: [
{
id: 5066,
name: "Actinopterygii",
canonicalForm: "Actinopterygii",
italicisedForm: "<i>Actinopterygii</i>",
rank: "Class",
nameStatus: "accepted",
sourceDatabase: "",
defaultHierarchy: [
{
id: 1,
lid: 5066,
rank: 0,
name: "Animalia",
canonical_form: "Animalia"
},
{
id: 71,
lid: 5066,
rank: 1,
name: "Chordata",
canonical_form: "Chordata"
},
{
id: 5066,
lid: 5066,
rank: 2,
name: "Actinopterygii",
canonical_form: "Actinopterygii"
}
],
group: null,
parentName: null,
position: "Clean",
speciesId: null
}
],
traitTypes: {
enumType: "species.trait.Trait$TraitTypes",
name: "RANGE"
},
dataTypes: {
enumType: "species.trait.Trait$DataTypes",
name: "NUMERIC"
},
units: null,
values: [ ]
},
{
id: 21,
name: "Turbidity",
isParticipatory: false,
description: "Secchi depth (m)",
createdOn: "2018-03-14T16:01:25Z",
source: null,
icon: null,
ontologyUrl: null,
field: {
concept: "Habitat and Distribution",
category: "General Habitat",
description: "General description of the sites where the species is found (ecosystem, forest, environment or microhabitat). Includes realm (e.g Terrestrial etc) and climatic information (e.g Boreal); also includes requirements and tolerances; horizontal and vertical (altitudinal) distribution. Also includes information referring to territorial extension of the individual or group in terms of its activities (feeding, mating, etc.), associated mostly to vertebrates.",
language: {
id: 1,
name: "English",
threeLetterCode: "eng",
twoLetterCode: null
}
},
taxon: [
{
id: 5066,
name: "Actinopterygii",
canonicalForm: "Actinopterygii",
italicisedForm: "<i>Actinopterygii</i>",
rank: "Class",
nameStatus: "accepted",
sourceDatabase: "",
defaultHierarchy: [
{
id: 1,
lid: 5066,
rank: 0,
name: "Animalia",
canonical_form: "Animalia"
},
{
id: 71,
lid: 5066,
rank: 1,
name: "Chordata",
canonical_form: "Chordata"
},
{
id: 5066,
lid: 5066,
rank: 2,
name: "Actinopterygii",
canonical_form: "Actinopterygii"
}
],
group: null,
parentName: null,
position: "Clean",
speciesId: null
}
],
traitTypes: {
enumType: "species.trait.Trait$TraitTypes",
name: "RANGE"
},
dataTypes: {
enumType: "species.trait.Trait$DataTypes",
name: "NUMERIC"
},
units: null,
values: [ ]
},
{
id: 22,
name: "Observation mode",
isParticipatory: false,
description: "To identify and select sub-sets of data for specific surveys, studies or assessments. To identify data recorded for specific ESIA or ESMP monitoring and evaluation. Filter data according to accuracy or purpose.",
createdOn: "2018-03-14T16:08:18Z",
source: null,
icon: null,
ontologyUrl: null,
field: {
concept: "Information Listing",
category: "References",
description: "Compilation of all text resources and publications associated with/referred to/ cited in entire page",
language: {
id: 1,
name: "English",
threeLetterCode: "eng",
twoLetterCode: null
}
},
taxon: [
{
id: 5066,
name: "Actinopterygii",
canonicalForm: "Actinopterygii",
italicisedForm: "<i>Actinopterygii</i>",
rank: "Class",
nameStatus: "accepted",
sourceDatabase: "",
defaultHierarchy: [
{
id: 1,
lid: 5066,
rank: 0,
name: "Animalia",
canonical_form: "Animalia"
},
{
id: 71,
lid: 5066,
rank: 1,
name: "Chordata",
canonical_form: "Chordata"
},
{
id: 5066,
lid: 5066,
rank: 2,
name: "Actinopterygii",
canonical_form: "Actinopterygii"
}
],
group: null,
parentName: null,
position: "Clean",
speciesId: null
}
],
traitTypes: {
enumType: "species.trait.Trait$TraitTypes",
name: "SINGLE_CATEGORICAL"
},
dataTypes: {
enumType: "species.trait.Trait$DataTypes",
name: "STRING"
},
units: null,
values: [
{
id: 51,
value: "Scientific survey",
description: "",
icon: "/cb1641fb-e3e3-4ddd-89b7-e5c8a792f1b1/resources/962.png",
source: ""
},
{
id: 52,
value: "Scientific monitoring",
description: "",
icon: "/cb1641fb-e3e3-4ddd-89b7-e5c8a792f1b1/resources/491.png",
source: ""
},
{
id: 53,
value: "e-flows assessment",
description: "",
icon: "/cb1641fb-e3e3-4ddd-89b7-e5c8a792f1b1/resources/420.png",
source: ""
},
{
id: 54,
value: "ESIA/ESMP",
description: "",
icon: "/cb1641fb-e3e3-4ddd-89b7-e5c8a792f1b1/resources/352.png",
source: ""
},
{
id: 55,
value: "Recreational angling",
description: "",
icon: "/cb1641fb-e3e3-4ddd-89b7-e5c8a792f1b1/resources/350.png",
source: ""
},
{
id: 56,
value: "Subsistence fishing",
description: "",
icon: "/cb1641fb-e3e3-4ddd-89b7-e5c8a792f1b1/resources/82.png",
source: ""
},
{
id: 57,
value: "Commercial fishing",
description: "",
icon: "/cb1641fb-e3e3-4ddd-89b7-e5c8a792f1b1/resources/781.png",
source: ""
},
{
id: 58,
value: "Traditional (community) fishing",
description: "",
icon: "/cb1641fb-e3e3-4ddd-89b7-e5c8a792f1b1/resources/514.png",
source: ""
},
{
id: 59,
value: "Casual observation.",
description: "",
icon: "/cb1641fb-e3e3-4ddd-89b7-e5c8a792f1b1/resources/123.png",
source: ""
}
]
},
{
id: 23,
name: "Scientific study / monitoring reference / e-flows assessment/ study reference number",
isParticipatory: false,
description: null,
createdOn: "2018-03-14T16:11:39Z",
source: null,
icon: null,
ontologyUrl: null,
field: {
concept: "Information Listing",
category: "References",
description: "Compilation of all text resources and publications associated with/referred to/ cited in entire page",
language: {
id: 1,
name: "English",
threeLetterCode: "eng",
twoLetterCode: null
}
},
taxon: [
{
id: 5066,
name: "Actinopterygii",
canonicalForm: "Actinopterygii",
italicisedForm: "<i>Actinopterygii</i>",
rank: "Class",
nameStatus: "accepted",
sourceDatabase: "",
defaultHierarchy: [
{
id: 1,
lid: 5066,
rank: 0,
name: "Animalia",
canonical_form: "Animalia"
},
{
id: 71,
lid: 5066,
rank: 1,
name: "Chordata",
canonical_form: "Chordata"
},
{
id: 5066,
lid: 5066,
rank: 2,
name: "Actinopterygii",
canonical_form: "Actinopterygii"
}
],
group: null,
parentName: null,
position: "Clean",
speciesId: null
}
],
traitTypes: {
enumType: "species.trait.Trait$TraitTypes",
name: "RANGE"
},
dataTypes: {
enumType: "species.trait.Trait$DataTypes",
name: "NUMERIC"
},
units: null,
values: [ ]
},
{
id: 24,
name: "ESIA/ESMP reference number",
isParticipatory: false,
description: null,
createdOn: "2018-03-14T16:13:54Z",
source: null,
icon: null,
ontologyUrl: null,
field: {
concept: "Information Listing",
category: "References",
description: "Compilation of all text resources and publications associated with/referred to/ cited in entire page",
language: {
id: 1,
name: "English",
threeLetterCode: "eng",
twoLetterCode: null
}
},
taxon: [
{
id: 5066,
name: "Actinopterygii",
canonicalForm: "Actinopterygii",
italicisedForm: "<i>Actinopterygii</i>",
rank: "Class",
nameStatus: "accepted",
sourceDatabase: "",
defaultHierarchy: [
{
id: 1,
lid: 5066,
rank: 0,
name: "Animalia",
canonical_form: "Animalia"
},
{
id: 71,
lid: 5066,
rank: 1,
name: "Chordata",
canonical_form: "Chordata"
},
{
id: 5066,
lid: 5066,
rank: 2,
name: "Actinopterygii",
canonical_form: "Actinopterygii"
}
],
group: null,
parentName: null,
position: "Clean",
speciesId: null
}
],
traitTypes: {
enumType: "species.trait.Trait$TraitTypes",
name: "RANGE"
},
dataTypes: {
enumType: "species.trait.Trait$DataTypes",
name: "NUMERIC"
},
units: null,
values: [ ]
},
{
id: 25,
name: "Recreational fishing permit or subsistence or commercial fishing license number",
isParticipatory: false,
description: null,
createdOn: "2018-03-14T16:15:26Z",
source: null,
icon: null,
ontologyUrl: null,
field: {
concept: "Information Listing",
category: "References",
description: "Compilation of all text resources and publications associated with/referred to/ cited in entire page",
language: {
id: 1,
name: "English",
threeLetterCode: "eng",
twoLetterCode: null
}
},
taxon: [
{
id: 5066,
name: "Actinopterygii",
canonicalForm: "Actinopterygii",
italicisedForm: "<i>Actinopterygii</i>",
rank: "Class",
nameStatus: "accepted",
sourceDatabase: "",
defaultHierarchy: [
{
id: 1,
lid: 5066,
rank: 0,
name: "Animalia",
canonical_form: "Animalia"
},
{
id: 71,
lid: 5066,
rank: 1,
name: "Chordata",
canonical_form: "Chordata"
},
{
id: 5066,
lid: 5066,
rank: 2,
name: "Actinopterygii",
canonical_form: "Actinopterygii"
}
],
group: null,
parentName: null,
position: "Clean",
speciesId: null
}
],
traitTypes: {
enumType: "species.trait.Trait$TraitTypes",
name: "RANGE"
},
dataTypes: {
enumType: "species.trait.Trait$DataTypes",
name: "NUMERIC"
},
units: null,
values: [ ]
},
{
id: 26,
name: "User ID",
isParticipatory: false,
description: null,
createdOn: "2018-03-14T16:17:30Z",
source: null,
icon: null,
ontologyUrl: null,
field: {
concept: "Information Listing",
category: "References",
description: "Compilation of all text resources and publications associated with/referred to/ cited in entire page",
language: {
id: 1,
name: "English",
threeLetterCode: "eng",
twoLetterCode: null
}
},
taxon: [
{
id: 5066,
name: "Actinopterygii",
canonicalForm: "Actinopterygii",
italicisedForm: "<i>Actinopterygii</i>",
rank: "Class",
nameStatus: "accepted",
sourceDatabase: "",
defaultHierarchy: [
{
id: 1,
lid: 5066,
rank: 0,
name: "Animalia",
canonical_form: "Animalia"
},
{
id: 71,
lid: 5066,
rank: 1,
name: "Chordata",
canonical_form: "Chordata"
},
{
id: 5066,
lid: 5066,
rank: 2,
name: "Actinopterygii",
canonical_form: "Actinopterygii"
}
],
group: null,
parentName: null,
position: "Clean",
speciesId: null
}
],
traitTypes: {
enumType: "species.trait.Trait$TraitTypes",
name: "RANGE"
},
dataTypes: {
enumType: "species.trait.Trait$DataTypes",
name: "NUMERIC"
},
units: null,
values: [ ]
},
{
id: 27,
name: "Observation effort",
isParticipatory: false,
description: "Observation effort in hours",
createdOn: "2018-03-14T16:20:02Z",
source: null,
icon: null,
ontologyUrl: null,
field: {
concept: "Information Listing",
category: "References",
description: "Compilation of all text resources and publications associated with/referred to/ cited in entire page",
language: {
id: 1,
name: "English",
threeLetterCode: "eng",
twoLetterCode: null
}
},
taxon: [
{
id: 5066,
name: "Actinopterygii",
canonicalForm: "Actinopterygii",
italicisedForm: "<i>Actinopterygii</i>",
rank: "Class",
nameStatus: "accepted",
sourceDatabase: "",
defaultHierarchy: [
{
id: 1,
lid: 5066,
rank: 0,
name: "Animalia",
canonical_form: "Animalia"
},
{
id: 71,
lid: 5066,
rank: 1,
name: "Chordata",
canonical_form: "Chordata"
},
{
id: 5066,
lid: 5066,
rank: 2,
name: "Actinopterygii",
canonical_form: "Actinopterygii"
}
],
group: null,
parentName: null,
position: "Clean",
speciesId: null
}
],
traitTypes: {
enumType: "species.trait.Trait$TraitTypes",
name: "RANGE"
},
dataTypes: {
enumType: "species.trait.Trait$DataTypes",
name: "NUMERIC"
},
units: null,
values: [ ]
},
{
id: 28,
name: "Observation area",
isParticipatory: false,
description: "Observation area in meter square",
createdOn: "2018-03-14T16:22:16Z",
source: null,
icon: null,
ontologyUrl: null,
field: {
concept: "Information Listing",
category: "References",
description: "Compilation of all text resources and publications associated with/referred to/ cited in entire page",
language: {
id: 1,
name: "English",
threeLetterCode: "eng",
twoLetterCode: null
}
},
taxon: [
{
id: 5066,
name: "Actinopterygii",
canonicalForm: "Actinopterygii",
italicisedForm: "<i>Actinopterygii</i>",
rank: "Class",
nameStatus: "accepted",
sourceDatabase: "",
defaultHierarchy: [
{
id: 1,
lid: 5066,
rank: 0,
name: "Animalia",
canonical_form: "Animalia"
},
{
id: 71,
lid: 5066,
rank: 1,
name: "Chordata",
canonical_form: "Chordata"
},
{
id: 5066,
lid: 5066,
rank: 2,
name: "Actinopterygii",
canonical_form: "Actinopterygii"
}
],
group: null,
parentName: null,
position: "Clean",
speciesId: null
}
],
traitTypes: {
enumType: "species.trait.Trait$TraitTypes",
name: "RANGE"
},
dataTypes: {
enumType: "species.trait.Trait$DataTypes",
name: "NUMERIC"
},
units: null,
values: [ ]
},
{
id: 29,
name: "Abundance Count",
isParticipatory: false,
description: null,
createdOn: "2018-03-15T04:10:01Z",
source: null,
icon: null,
ontologyUrl: null,
field: {
concept: "Information Listing",
category: "References",
description: "Compilation of all text resources and publications associated with/referred to/ cited in entire page",
language: {
id: 1,
name: "English",
threeLetterCode: "eng",
twoLetterCode: null
}
},
taxon: [
{
id: 5066,
name: "Actinopterygii",
canonicalForm: "Actinopterygii",
italicisedForm: "<i>Actinopterygii</i>",
rank: "Class",
nameStatus: "accepted",
sourceDatabase: "",
defaultHierarchy: [
{
id: 1,
lid: 5066,
rank: 0,
name: "Animalia",
canonical_form: "Animalia"
},
{
id: 71,
lid: 5066,
rank: 1,
name: "Chordata",
canonical_form: "Chordata"
},
{
id: 5066,
lid: 5066,
rank: 2,
name: "Actinopterygii",
canonical_form: "Actinopterygii"
}
],
group: null,
parentName: null,
position: "Clean",
speciesId: null
}
],
traitTypes: {
enumType: "species.trait.Trait$TraitTypes",
name: "RANGE"
},
dataTypes: {
enumType: "species.trait.Trait$DataTypes",
name: "NUMERIC"
},
units: null,
values: [ ]
},
{
id: 30,
name: "Biomass(Kg)",
isParticipatory: false,
description: null,
createdOn: "2018-03-15T04:11:32Z",
source: null,
icon: null,
ontologyUrl: null,
field: {
concept: "Information Listing",
category: "References",
description: "Compilation of all text resources and publications associated with/referred to/ cited in entire page",
language: {
id: 1,
name: "English",
threeLetterCode: "eng",
twoLetterCode: null
}
},
taxon: [
{
id: 5066,
name: "Actinopterygii",
canonicalForm: "Actinopterygii",
italicisedForm: "<i>Actinopterygii</i>",
rank: "Class",
nameStatus: "accepted",
sourceDatabase: "",
defaultHierarchy: [
{
id: 1,
lid: 5066,
rank: 0,
name: "Animalia",
canonical_form: "Animalia"
},
{
id: 71,
lid: 5066,
rank: 1,
name: "Chordata",
canonical_form: "Chordata"
},
{
id: 5066,
lid: 5066,
rank: 2,
name: "Actinopterygii",
canonical_form: "Actinopterygii"
}
],
group: null,
parentName: null,
position: "Clean",
speciesId: null
}
],
traitTypes: {
enumType: "species.trait.Trait$TraitTypes",
name: "RANGE"
},
dataTypes: {
enumType: "species.trait.Trait$DataTypes",
name: "NUMERIC"
},
units: null,
values: [ ]
}
],
instanceTotal: 2244,
queryParams: {
isDeleted: false,
classification: 40000,
sGroup: [
4
],
parentTaxon: [ ],
showInObservation: true,
isNotObservationTrait: false,
trait: null,
max: 100,
offset: 0
},
activeFilters: {
classification: 40000,
sGroup: [
4
],
isNotObservationTrait: false,
append: true
},
resultType: "trait",
factInstance: { },
instance: {
id: 3411,
title: "<i><i>Paris polyphylla </i>Sm. </i>",
placeName: "Bumthang, Bhutan",
reverseGeocodedName: "Bumthang, Bhutan",
geoPrivacy: false,
locationAccuracy: "Approximate",
topology: "POINT (90.67730460000007 27.641839)",
group: {
id: 4,
name: "Plants",
groupOrder: 9
},
habitat: {
id: 2,
name: "Forest",
habitatOrder: 2
},
fromDate: "2010-07-05T18:00:00Z",
toDate: "2010-07-05T18:00:00Z",
createdOn: "2014-04-25T04:12:12Z",
lastRevised: "2017-11-22T15:24:41Z",
author: {
id: 105,
name: "Sonam Wangchen",
icon: "http://biodiversity.bt/biodiv/users//75014f90-622f-4229-9ccc-2fd96d90fde3/resources/10_th1.jpg"
},
thumbnail: "http://biodiversity.bt/biodiv/observations//e905aa83-6ebc-498f-a952-2d0a16505879/995_th1.jpg",
notes: "",
summary: "Observed by <b><a href='/user/show/105'>Sonam Wangchen</a></b> at <b>'Bumthang, Bhutan'</b> on <b>July 06, 2010</b>.",
rating: 0,
resource: [
{
id: 3250,
description: null,
uploader: {
id: 105,
name: "Sonam Wangchen",
icon: "http://biodiversity.bt/biodiv/users//75014f90-622f-4229-9ccc-2fd96d90fde3/resources/10_th1.jpg"
},
type: "Image",
uploadTime: "2014-04-25T04:12:12Z",
rating: 0,
totalRatings: 0,
averageRating: 0,
license: {
name: "CC BY",
url: "http://creativecommons.org/licenses/by/3.0/"
},
contributors: [
{
name: "Wangchen La"
}
],
attributors: [ ],
annotations: { },
url: "http://biodiversity.bt/biodiv/observations//e905aa83-6ebc-498f-a952-2d0a16505879/995.JPG",
icon: "http://biodiversity.bt/biodiv/observations//e905aa83-6ebc-498f-a952-2d0a16505879/995_th1.jpg"
}
],
recoVotes: [
{
id: 14599,
observation: 3411,
recommendation: {
id: 13,
name: "Paris polyphylla",
taxonomyDefinition: {
id: 3914,
name: "Paris polyphylla Sm.",
canonicalForm: "Paris polyphylla",
italicisedForm: "<i>Paris polyphylla </i>Sm. ",
rank: "Species",
nameStatus: "accepted",
sourceDatabase: "WCSP: World Checklist of Selected Plant Families",
defaultHierarchy: [
{
id: 997,
lid: 3914,
rank: 0,
name: "Plantae",
canonical_form: "Plantae"
},
{
id: 5060,
lid: 3914,
rank: 1,
name: "Tracheophyta",
canonical_form: "Tracheophyta"
},
{
id: 1367,
lid: 3914,
rank: 2,
name: "Liliopsida",
canonical_form: "Liliopsida"
},
{
id: 1582,
lid: 3914,
rank: 3,
name: "Liliales",
canonical_form: "Liliales"
},
{
id: 1583,
lid: 3914,
rank: 5,
name: "Melanthiaceae",
canonical_form: "Melanthiaceae"
},
{
id: 3913,
lid: 3914,
rank: 7,
name: "Paris",
canonical_form: "Paris"
},
{
id: 3914,
lid: 3914,
rank: 9,
name: "Paris polyphylla Sm.",
canonical_form: "Paris polyphylla"
}
],
group: {
id: 4,
name: "Plants",
groupOrder: 9
},
parentName: null,
position: "Working",
speciesId: 2278
},
hasObvLockPerm: false
},
author: {
id: 224,
name: "Sonam Rinzin",
icon: "http://graph.facebook.com/100005888170753/picture?type=large"
},
confidence: "I am certain",
votedOn: "2015-09-30T06:28:26Z"
},
{
id: 4478,
observation: 3411,
recommendation: {
id: 13,
name: "Paris polyphylla",
taxonomyDefinition: {
id: 3914,
name: "Paris polyphylla Sm.",
canonicalForm: "Paris polyphylla",
italicisedForm: "<i>Paris polyphylla </i>Sm. ",
rank: "Species",
nameStatus: "accepted",
sourceDatabase: "WCSP: World Checklist of Selected Plant Families",
defaultHierarchy: [
{
id: 997,
lid: 3914,
rank: 0,
name: "Plantae",
canonical_form: "Plantae"
},
{
id: 5060,
lid: 3914,
rank: 1,
name: "Tracheophyta",
canonical_form: "Tracheophyta"
},
{
id: 1367,
lid: 3914,
rank: 2,
name: "Liliopsida",
canonical_form: "Liliopsida"
},
{
id: 1582,
lid: 3914,
rank: 3,
name: "Liliales",
canonical_form: "Liliales"
},
{
id: 1583,
lid: 3914,
rank: 5,
name: "Melanthiaceae",
canonical_form: "Melanthiaceae"
},
{
id: 3913,
lid: 3914,
rank: 7,
name: "Paris",
canonical_form: "Paris"
},
{
id: 3914,
lid: 3914,
rank: 9,
name: "Paris polyphylla Sm.",
canonical_form: "Paris polyphylla"
}
],
group: {
id: 4,
name: "Plants",
groupOrder: 9
},
parentName: null,
position: "Working",
speciesId: 2278
},
hasObvLockPerm: false
},
author: {
id: 105,
name: "Sonam Wangchen",
icon: "http://biodiversity.bt/biodiv/users//75014f90-622f-4229-9ccc-2fd96d90fde3/resources/10_th1.jpg"
},
confidence: "I am certain",
votedOn: "2014-04-25T04:12:12Z",
commonNameReco: {
id: 12484,
name: "Himalayan Paris",
language: {
id: 1,
name: "English",
threeLetterCode: "eng",
twoLetterCode: null
},
hasObvLockPerm: false
}
},
{
id: 4485,
observation: 3411,
recommendation: {
id: 13,
name: "Paris polyphylla",
taxonomyDefinition: {
id: 3914,
name: "Paris polyphylla Sm.",
canonicalForm: "Paris polyphylla",
italicisedForm: "<i>Paris polyphylla </i>Sm. ",
rank: "Species",
nameStatus: "accepted",
sourceDatabase: "WCSP: World Checklist of Selected Plant Families",
defaultHierarchy: [
{
id: 997,
lid: 3914,
rank: 0,
name: "Plantae",
canonical_form: "Plantae"
},
{
id: 5060,
lid: 3914,
rank: 1,
name: "Tracheophyta",
canonical_form: "Tracheophyta"
},
{
id: 1367,
lid: 3914,
rank: 2,
name: "Liliopsida",
canonical_form: "Liliopsida"
},
{
id: 1582,
lid: 3914,
rank: 3,
name: "Liliales",
canonical_form: "Liliales"
},
{
id: 1583,
lid: 3914,
rank: 5,
name: "Melanthiaceae",
canonical_form: "Melanthiaceae"
},
{
id: 3913,
lid: 3914,
rank: 7,
name: "Paris",
canonical_form: "Paris"
},
{
id: 3914,
lid: 3914,
rank: 9,
name: "Paris polyphylla Sm.",
canonical_form: "Paris polyphylla"
}
],
group: {
id: 4,
name: "Plants",
groupOrder: 9
},
parentName: null,
position: "Working",
speciesId: 2278
},
hasObvLockPerm: false
},
author: {
id: 62,
name: "Phuentsho",
icon: "http://biodiversity.bt/biodiv/users//68071309-7236-4de4-ae68-85620026cb02/resources/338_th1.jpg"
},
confidence: "I am certain",
votedOn: "2014-04-25T08:28:23Z"
},
{
id: 4486,
observation: 3411,
recommendation: {
id: 13,
name: "Paris polyphylla",
taxonomyDefinition: {
id: 3914,
name: "Paris polyphylla Sm.",
canonicalForm: "Paris polyphylla",
italicisedForm: "<i>Paris polyphylla </i>Sm. ",
rank: "Species",
nameStatus: "accepted",
sourceDatabase: "WCSP: World Checklist of Selected Plant Families",
defaultHierarchy: [
{
id: 997,
lid: 3914,
rank: 0,
name: "Plantae",
canonical_form: "Plantae"
},
{
id: 5060,
lid: 3914,
rank: 1,
name: "Tracheophyta",
canonical_form: "Tracheophyta"
},
{
id: 1367,
lid: 3914,
rank: 2,
name: "Liliopsida",
canonical_form: "Liliopsida"
},
{
id: 1582,
lid: 3914,
rank: 3,
name: "Liliales",
canonical_form: "Liliales"
},
{
id: 1583,
lid: 3914,
rank: 5,
name: "Melanthiaceae",
canonical_form: "Melanthiaceae"
},
{
id: 3913,
lid: 3914,
rank: 7,
name: "Paris",
canonical_form: "Paris"
},
{
id: 3914,
lid: 3914,
rank: 9,
name: "Paris polyphylla Sm.",
canonical_form: "Paris polyphylla"
}
],
group: {
id: 4,
name: "Plants",
groupOrder: 9
},
parentName: null,
position: "Working",
speciesId: 2278
},
hasObvLockPerm: false
},
author: {
id: 49,
name: "Yeshi Tshering",
icon: "http://graph.facebook.com/100004309622063/picture?type=large"
},
confidence: "I am certain",
votedOn: "2014-04-25T09:14:22Z"
},
{
id: 14471,
observation: 3411,
recommendation: {
id: 13,
name: "Paris polyphylla",
taxonomyDefinition: {
id: 3914,
name: "Paris polyphylla Sm.",
canonicalForm: "Paris polyphylla",
italicisedForm: "<i>Paris polyphylla </i>Sm. ",
rank: "Species",
nameStatus: "accepted",
sourceDatabase: "WCSP: World Checklist of Selected Plant Families",
defaultHierarchy: [
{
id: 997,
lid: 3914,
rank: 0,
name: "Plantae",
canonical_form: "Plantae"
},
{
id: 5060,
lid: 3914,
rank: 1,
name: "Tracheophyta",
canonical_form: "Tracheophyta"
},
{
id: 1367,
lid: 3914,
rank: 2,
name: "Liliopsida",
canonical_form: "Liliopsida"
},
{
id: 1582,
lid: 3914,
rank: 3,
name: "Liliales",
canonical_form: "Liliales"
},
{
id: 1583,
lid: 3914,
rank: 5,
name: "Melanthiaceae",
canonical_form: "Melanthiaceae"
},
{
id: 3913,
lid: 3914,
rank: 7,
name: "Paris",
canonical_form: "Paris"
},
{
id: 3914,
lid: 3914,
rank: 9,
name: "Paris polyphylla Sm.",
canonical_form: "Paris polyphylla"
}
],
group: {
id: 4,
name: "Plants",
groupOrder: 9
},
parentName: null,
position: "Working",
speciesId: 2278
},
hasObvLockPerm: false
},
author: {
id: 26,
name: "Nima Gyeltshen",
icon: "http://graph.facebook.com/100004035410462/picture?type=large"
},
confidence: "I am certain",
votedOn: "2015-09-15T12:01:40Z"
},
{
id: 14441,
observation: 3411,
recommendation: {
id: 13,
name: "Paris polyphylla",
taxonomyDefinition: {
id: 3914,
name: "Paris polyphylla Sm.",
canonicalForm: "Paris polyphylla",
italicisedForm: "<i>Paris polyphylla </i>Sm. ",
rank: "Species",
nameStatus: "accepted",
sourceDatabase: "WCSP: World Checklist of Selected Plant Families",
defaultHierarchy: [
{
id: 997,
lid: 3914,
rank: 0,
name: "Plantae",
canonical_form: "Plantae"
},
{
id: 5060,
lid: 3914,
rank: 1,
name: "Tracheophyta",
canonical_form: "Tracheophyta"
},
{
id: 1367,
lid: 3914,
rank: 2,
name: "Liliopsida",
canonical_form: "Liliopsida"
},
{
id: 1582,
lid: 3914,
rank: 3,
name: "Liliales",
canonical_form: "Liliales"
},
{
id: 1583,
lid: 3914,
rank: 5,
name: "Melanthiaceae",
canonical_form: "Melanthiaceae"
},
{
id: 3913,
lid: 3914,
rank: 7,
name: "Paris",
canonical_form: "Paris"
},
{
id: 3914,
lid: 3914,
rank: 9,
name: "Paris polyphylla Sm.",
canonical_form: "Paris polyphylla"
}
],
group: {
id: 4,
name: "Plants",
groupOrder: 9
},
parentName: null,
position: "Working",
speciesId: 2278
},
hasObvLockPerm: false
},
author: {
id: 253,
name: "Natshok Rangdrel",
icon: "http://biodiversity.bt/biodiv/users//1242f4d8-ca61-453f-b039-d5010b8e3875/resources/507_th1.jpg"
},
confidence: "I am certain",
votedOn: "2015-09-05T07:36:31Z"
},
{
id: 4483,
observation: 3411,
recommendation: {
id: 13,
name: "Paris polyphylla",
taxonomyDefinition: {
id: 3914,
name: "Paris polyphylla Sm.",
canonicalForm: "Paris polyphylla",
italicisedForm: "<i>Paris polyphylla </i>Sm. ",
rank: "Species",
nameStatus: "accepted",
sourceDatabase: "WCSP: World Checklist of Selected Plant Families",
defaultHierarchy: [
{
id: 997,
lid: 3914,
rank: 0,
name: "Plantae",
canonical_form: "Plantae"
},
{
id: 5060,
lid: 3914,
rank: 1,
name: "Tracheophyta",
canonical_form: "Tracheophyta"
},
{
id: 1367,
lid: 3914,
rank: 2,
name: "Liliopsida",
canonical_form: "Liliopsida"
},
{
id: 1582,
lid: 3914,
rank: 3,
name: "Liliales",
canonical_form: "Liliales"
},
{
id: 1583,
lid: 3914,
rank: 5,
name: "Melanthiaceae",
canonical_form: "Melanthiaceae"
},
{
id: 3913,
lid: 3914,
rank: 7,
name: "Paris",
canonical_form: "Paris"
},
{
id: 3914,
lid: 3914,
rank: 9,
name: "Paris polyphylla Sm.",
canonical_form: "Paris polyphylla"
}
],
group: {
id: 4,
name: "Plants",
groupOrder: 9
},
parentName: null,
position: "Working",
speciesId: 2278
},
hasObvLockPerm: false
},
author: {
id: 25,
name: "Mani Prasad Nirola",
icon: "http://biodiversity.bt/biodiv/users//2d40772e-8e6a-46e6-bcb9-95d3be1b4494/resources/348_th1.jpg"
},
confidence: "I am certain",
votedOn: "2014-04-25T05:03:53Z"
},
{
id: 14481,
observation: 3411,
recommendation: {
id: 13,
name: "Paris polyphylla",
taxonomyDefinition: {
id: 3914,
name: "Paris polyphylla Sm.",
canonicalForm: "Paris polyphylla",
italicisedForm: "<i>Paris polyphylla </i>Sm. ",
rank: "Species",
nameStatus: "accepted",
sourceDatabase: "WCSP: World Checklist of Selected Plant Families",
defaultHierarchy: [
{
id: 997,
lid: 3914,
rank: 0,
name: "Plantae",
canonical_form: "Plantae"
},
{
id: 5060,
lid: 3914,
rank: 1,
name: "Tracheophyta",
canonical_form: "Tracheophyta"
},
{
id: 1367,
lid: 3914,
rank: 2,
name: "Liliopsida",
canonical_form: "Liliopsida"
},
{
id: 1582,
lid: 3914,
rank: 3,
name: "Liliales",
canonical_form: "Liliales"
},
{
id: 1583,
lid: 3914,
rank: 5,
name: "Melanthiaceae",
canonical_form: "Melanthiaceae"
},
{
id: 3913,
lid: 3914,
rank: 7,
name: "Paris",
canonical_form: "Paris"
},
{
id: 3914,
lid: 3914,
rank: 9,
name: "Paris polyphylla Sm.",
canonical_form: "Paris polyphylla"
}
],
group: {
id: 4,
name: "Plants",
groupOrder: 9
},
parentName: null,
position: "Working",
speciesId: 2278
},
hasObvLockPerm: false
},
author: {
id: 151,
name: "Rinchen Wangchuk",
icon: "http://biodiversity.bt/biodiv/users//5b3a851c-c1a4-456f-a5f2-0f3b8705a0a3/resources/462_th1.jpg"
},
confidence: "I am certain",
votedOn: "2015-09-17T08:18:45Z"
},
{
id: 267173,
observation: 3411,
recommendation: {
id: 13,
name: "Paris polyphylla",
taxonomyDefinition: {
id: 3914,
name: "Paris polyphylla Sm.",
canonicalForm: "Paris polyphylla",
italicisedForm: "<i>Paris polyphylla </i>Sm. ",
rank: "Species",
nameStatus: "accepted",
sourceDatabase: "WCSP: World Checklist of Selected Plant Families",
defaultHierarchy: [
{
id: 997,
lid: 3914,
rank: 0,
name: "Plantae",
canonical_form: "Plantae"
},
{
id: 5060,
lid: 3914,
rank: 1,
name: "Tracheophyta",
canonical_form: "Tracheophyta"
},
{
id: 1367,
lid: 3914,
rank: 2,
name: "Liliopsida",
canonical_form: "Liliopsida"
},
{
id: 1582,
lid: 3914,
rank: 3,
name: "Liliales",
canonical_form: "Liliales"
},
{
id: 1583,
lid: 3914,
rank: 5,
name: "Melanthiaceae",
canonical_form: "Melanthiaceae"
},
{
id: 3913,
lid: 3914,
rank: 7,
name: "Paris",
canonical_form: "Paris"
},
{
id: 3914,
lid: 3914,
rank: 9,
name: "Paris polyphylla Sm.",
canonical_form: "Paris polyphylla"
}
],
group: {
id: 4,
name: "Plants",
groupOrder: 9
},
parentName: null,
position: "Working",
speciesId: 2278
},
hasObvLockPerm: false
},
author: {
id: 1337,
name: "Tshering Tobgay ",
icon: "http://biodiversity.bt/biodiv/users/user_large.png"
},
confidence: "I am certain",
votedOn: "2017-11-22T15:24:41Z"
},
{
id: 267162,
observation: 3411,
recommendation: {
id: 13,
name: "Paris polyphylla",
taxonomyDefinition: {
id: 3914,
name: "Paris polyphylla Sm.",
canonicalForm: "Paris polyphylla",
italicisedForm: "<i>Paris polyphylla </i>Sm. ",
rank: "Species",
nameStatus: "accepted",
sourceDatabase: "WCSP: World Checklist of Selected Plant Families",
defaultHierarchy: [
{
id: 997,
lid: 3914,
rank: 0,
name: "Plantae",
canonical_form: "Plantae"
},
{
id: 5060,
lid: 3914,
rank: 1,
name: "Tracheophyta",
canonical_form: "Tracheophyta"
},
{
id: 1367,
lid: 3914,
rank: 2,
name: "Liliopsida",
canonical_form: "Liliopsida"
},
{
id: 1582,
lid: 3914,
rank: 3,
name: "Liliales",
canonical_form: "Liliales"
},
{
id: 1583,
lid: 3914,
rank: 5,
name: "Melanthiaceae",
canonical_form: "Melanthiaceae"
},
{
id: 3913,
lid: 3914,
rank: 7,
name: "Paris",
canonical_form: "Paris"
},
{
id: 3914,
lid: 3914,
rank: 9,
name: "Paris polyphylla Sm.",
canonical_form: "Paris polyphylla"
}
],
group: {
id: 4,
name: "Plants",
groupOrder: 9
},
parentName: null,
position: "Working",
speciesId: 2278
},
hasObvLockPerm: false
},
author: {
id: 18,
name: "Choki Gyeltshen",
icon: "http://biodiversity.bt/biodiv/users//3335963d-1a0f-4d29-a056-0257ba6948e6/resources/366_th1.jpg"
},
confidence: "I am certain",
votedOn: "2017-11-22T13:30:19Z"
}
],
customFields: { },
userGroups: [ ],
language: {
id: 1,
name: "English",
threeLetterCode: "eng",
twoLetterCode: null
},
isDeleted: false,
isLocked: false,
isChecklist: false,
visitCount: 9567,
flagCount: 0,
featureCount: 0,
noOfIdentifications: 10,
noOfImages: 1,
noOfVideos: 0,
noOfAudio: 0,
maxVotedReco: {
commonNamesRecoList: [
{
id: 12484,
name: "Himalayan Paris",
language: {
id: 1,
name: "English",
threeLetterCode: "eng",
twoLetterCode: null
},
hasObvLockPerm: false
}
],
sciNameReco: {
id: 13,
name: "Paris polyphylla",
taxonomyDefinition: {
id: 3914,
name: "Paris polyphylla Sm.",
canonicalForm: "Paris polyphylla",
italicisedForm: "<i>Paris polyphylla </i>Sm. ",
rank: "Species",
nameStatus: "accepted",
sourceDatabase: "WCSP: World Checklist of Selected Plant Families",
defaultHierarchy: [
{
id: 997,
lid: 3914,
rank: 0,
name: "Plantae",
canonical_form: "Plantae"
},
{
id: 5060,
lid: 3914,
rank: 1,
name: "Tracheophyta",
canonical_form: "Tracheophyta"
},
{
id: 1367,
lid: 3914,
rank: 2,
name: "Liliopsida",
canonical_form: "Liliopsida"
},
{
id: 1582,
lid: 3914,
rank: 3,
name: "Liliales",
canonical_form: "Liliales"
},
{
id: 1583,
lid: 3914,
rank: 5,
name: "Melanthiaceae",
canonical_form: "Melanthiaceae"
},
{
id: 3913,
lid: 3914,
rank: 7,
name: "Paris",
canonical_form: "Paris"
},
{
id: 3914,
lid: 3914,
rank: 9,
name: "Paris polyphylla Sm.",
canonical_form: "Paris polyphylla"
}
],
group: {
id: 4,
name: "Plants",
groupOrder: 9
},
parentName: null,
position: "Working",
speciesId: 2278
},
hasObvLockPerm: false
}
}
},
numericTraitMinMax: [
{
min: 15,
max: 42,
id: 12
},
{
min: 25,
max: 25,
id: 6
},
{
min: 12,
max: 32,
id: 11
}
],
userLanguage: {
id: 1,
name: "English",
threeLetterCode: "eng",
twoLetterCode: null
},
displayAny: false,
editable: true,
filterable: false,
fromObservationShow: "show",
ifOwns: false
}
}

class Traits extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      response:null,
      numericTraitMinMax:null,
      login_modal:false,
      options:'',
      loading:false
    }
    this.fact= new Map();
    this.traitIdMap = new Map();
    this.myMap= new Map();
    this.getTraits=this.getTraits.bind(this)
    this.getTraits(this.props.id,this.props.sGroup)
    this.pushTraitsCheckboxDefault =  this.pushTraitsCheckboxDefault.bind(this);
    this.pushTraitsRadioDefault = this.pushTraitsRadioDefault.bind(this);
    this.pushTraitsDateRange = this.pushTraitsDateRange.bind(this);
}

   getTraits(id,sGroup){
     document.body.style.cursor = "wait";
     var options={
       method:'GET',
       url: Config.api.ROOT_URL+"/trait/list",
       params:{
         objectId:id,
         objectType:"species.participation.Observation",
         sGroup:sGroup,
         isObservationTrait:true,
         ifOwns:false,
         showInObservation:true,
         loadMore:true,
         displayAny:false,
         editable:true,
         fromObservationShow:"show",
         filterable:false
       },
         json: 'true'
     }
    axios(options)
        .then((response)=>{
          //console.log("traityy",response)
          document.body.style.cursor = "default";
          if(response.status === 200){
            let numericTrait = new Map();
          //  testTraitData.model.numericTraitMinMax.map((item,index)=>{
          //     let minMax= new Map();
          //     minMax.set("min",item.min);
          //     minMax.set("max",item.max);
          //     numericTrait.set(item.id,minMax);
          //   })

            this.setState({
              //response:response.data.model
              response:testTraitData.model,
              //numericTraitMinMax:numericTrait
            })

          }
        })
}

pushTraitsRadio(traitId,value){
  //console.log("fired")
  if(this.traitIdMap.get(traitId) !== undefined){
    if(this.traitIdMap.get(traitId).get(value))
    {
      this.traitIdMap.get(traitId).clear()
      var radioActive1= "radioActive"+traitId+value;

      this.refs[radioActive1].classList.remove("active")

    }
    else
    {
      this.traitIdMap.get(traitId).clear()
      var x = new Map()
      x.set(value,value)
      this.traitIdMap.set(traitId,x)
    }
  }else{
    var x = new Map()
    x.set(value,value)
    this.traitIdMap.set(traitId,x)
  }
  //this.myMap.clear()

  //this.myMap.set(value,value)

  //console.log(this.myMap)
  //console.log(this.traitIdMap)
}
pushTraitsRadioDefault(traitId,value){
  if(this.traitIdMap.get(traitId) !== undefined){
    this.traitIdMap.get(traitId).clear();
  }
  var x = new Map();
  //this.myMap.set(value,value)
  x.set(value,value)
  this.traitIdMap.set(traitId,x);
}
pushTraitsCheckbox(traitId,value){
  //console.log("fired")
  //console.log(this.traitIdMap.get(traitId))
  if(this.traitIdMap.get(traitId) ===undefined){
    var x = new Map();
    x.set(value,value);
    this.traitIdMap.set(traitId,x);
  }else{
    if(this.traitIdMap.get(traitId).get(value)){
      this.traitIdMap.get(traitId).delete(value)
      var checkboxActive1 = "checkboxActive"+traitId+value
      this.refs[checkboxActive1].classList.remove("active")
    }else{
      this.traitIdMap.get(traitId).set(value,value);
    }
  }
  //console.log(this.traitIdMap.get(traitId))
  //this.myMap.get(value)?this.myMap.delete(value):this.myMap.set(value,value)
  //console.log(this.myMap)
  //his.traitIdMap.get(traitId).get(value)?this.traitIdMap.get(traitId).delete(value):this.traitIdMap.get(traitId).set(value,value);
}

pushTraitsCheckboxDefault(traitId,value){
  if(this.traitIdMap.get(traitId) ===undefined){
    this.traitIdMap.set(traitId,new Map());
  }
  this.traitIdMap.get(traitId).set(value,value);
}

submitTraits(id1,id2,traitType,dataType){
  var proceed = true;
  document.body.style.cursor = "wait";
  this.setState({
    loading:true
  })
  var x = this.traitIdMap.get(id1);
  var arr=[]
  if(x.size>0){

    x.forEach(function(value){
      arr=arr.concat(value)
    })
    var list=arr.toString()

    var list1=id1+":"+list+";"
  }else{
    var list1=arr.toString()
  }

  var options={
    method: 'POST',
    url :   Config.api.ROOT_URL+"/fact/update",
    params:{
      traits:list1,
      traitId:id1,
      objectId:id2,
      objectType:"species.participation.Observation"
    },
    headers : AuthUtils.getAuthHeaders(),
    json: 'true'
  }

  // if(traitType === 'RANGE' && dataType === 'NUMERIC'){
  //   if(this.state.numericTraitMinMax.get(id1)){
  //     let min = this.state.numericTraitMinMax.get(id1).get("min")
  //     let max = this.state.numericTraitMinMax.get(id1).get("max")
  //
  //     if(arr[0] < min || arr[0] > max){
  //       proceed = false;
  //       alert("Input value must lie between "+min+" and "+max)
  //       document.body.style.cursor = "default";
  //       this.setState({
  //         loading:false
  //       })
  //     }
  //   }
  // }
  if(proceed === true){

    //this.myMap.clear()
    this.traitIdMap.delete(id1);
    //console.log(this.traitIdMap)
    //console.log(options)
    this.hide(id2,id1);
    axios(options)
          .then((response)=>{
            //console.log("traitpost",response)
            document.body.style.cursor = "default";
            this.setState({
              loading:false
            })
            if(response.status === 200){
              this.getTraits(this.props.id,this.props.sGroup)
            }
          })
          .catch((error)=>{
            document.body.style.cursor = "default";
            this.setState({
              loading:false
            })
            if(error.response.status === 401){
              this.setState({
              login_modal:!(this.state.login_modal),
              options:options
            })
          }else{
            console.log(error)
          }
          })
  }

  }

  pushTraitsNumericRange(traitId){
    var rangeNumeric1="rangeNumeric"+traitId+this.props.id;
    var value = this.refs[rangeNumeric1].value;
    // var min = this.state.numericTraitMinMax.get(traitId).get("min")
    // var max = this.state.numericTraitMinMax.get(traitId).get("max")
    // if(value>= min  && value<= max){
      if(this.traitIdMap.get(traitId) !== undefined){
        if(this.traitIdMap.get(traitId).get(value))
        {
          this.traitIdMap.get(traitId).clear()
        }
        else
        {
          this.traitIdMap.get(traitId).clear()
          var x = new Map()
          x.set(value,value)
          this.traitIdMap.set(traitId,x)
        }
      }else{
        var x = new Map()
        x.set(value,value)
        this.traitIdMap.set(traitId,x)
      }
    // }else{
    //   //alert("Input value must lie between "+min+" and "+max)
    // }

  }

  pushTraitsDateRange(traitId,minDate,maxDate){
    if(this.traitIdMap.get(traitId) !== undefined){
        this.traitIdMap.get(traitId).clear()
        var x = new Map()
        x.set("min",minDate)
        x.set("max",maxDate)
        this.traitIdMap.set(traitId,x)

    }else{
      var x = new Map()
      x.set("min",minDate)
      x.set("max",maxDate)
      this.traitIdMap.set(traitId,x)
    }
  }

  show(uni,item){

    var fact1='fact_'+uni+item
    var edit1='edit_'+uni+item
    var onclick_edit1='onclick_edit_'+uni+item
    var sub1='sub_'+uni+item
    var cancel1='cancel_'+uni+item
   this.refs.hasOwnProperty(fact1)?(this.refs[fact1].style.display="none"):null

   this.refs.hasOwnProperty(edit1)?(this.refs[edit1].style.display="none"):null
   this.refs.hasOwnProperty(onclick_edit1)?(this.refs[onclick_edit1].style.display="block"):null
   this.refs.hasOwnProperty(sub1)?(this.refs[sub1].style.display="block"):null
   this.refs.hasOwnProperty(cancel1)?(this.refs[cancel1].style.display="block"):null

}

  hide(uni,item){
    this.myMap.clear()
    var fact1='fact_'+uni+item
    var edit1='edit_'+uni+item
    var onclick_edit1='onclick_edit_'+uni+item
    var sub1='sub_'+uni+item
    var cancel1='cancel_'+uni+item
    this.refs.hasOwnProperty(fact1)?(this.refs[fact1].style.display="block"):null
    this.refs.hasOwnProperty(edit1)?(this.refs[edit1].style.display="block"):null
    this.refs.hasOwnProperty(onclick_edit1)?(this.refs[onclick_edit1].style.display="none"):null
    this.refs.hasOwnProperty(sub1)?(this.refs[sub1].style.display="none"):null
    this.refs.hasOwnProperty(cancel1)?(this.refs[cancel1].style.display="none"):null
  }




  render(){
    //console.log(this.state)
    var fact1=this.state.response
    return(    <div className="pre-scrollable">
        {this.state.login_modal==true?(<ModalPopup key={this.state.options} options={this.state.options} funcRefresh={this.getTraits} id={this.props.id} sGroup={this.props.sGroup}/>):null}
        {
            (this.state.response!==null)?(this.state.response.instanceList.map((item,index)=>{
                    if(item.isParticipatory===true){
                        return(
                        <div key={index} className="well well-sm" style={{width:'99%',marginLeft:'0.5%',marginBottom:'0.2%'}}>
                            <div className="name-and-button row">
                                <div className="name col-sm-8" style={{margin:'0%'}}>
                                    <a href={Config.api.ROOT_URL+"/trait/show/"+item.id+"/?trait."+item.id+"=any&max=&offset=0"} >
                                         <span>{item.name}</span>
                                     </a>
                                </div>
                                <div className="buttons col-sm-4">
                                    <a className="btn btn-xs btn-primary pull-right" ref={"edit_"+this.props.id+item.id} style={{display:'block',marginTop:'0%'}} onClick={this.show.bind(this,this.props.id,item.id)} disabled={this.state.loading}>edit</a>
                                    <a className="btn btn-xs btn-primary pull-right" ref={"cancel_"+this.props.id+item.id} style={{display:'none',marginTop:'0%'}} onClick={this.hide.bind(this,this.props.id,item.id)} disabled={this.state.loading}>cancel</a>
                                    <input className="btn btn-xs btn-primary pull-right" ref={"sub_"+this.props.id+item.id} type="submit" value="submit" style={{display:'none',marginTop:'0%'}} onClick={this.submitTraits.bind(this,item.id,this.props.id,item.traitTypes.name,item.dataTypes.name)} disabled={this.state.loading}/>
                                </div>
                            </div>
                            <div className="traits ">
                                  <div className="fact_instance " ref={"fact_"+this.props.id+item.id} style={{display:'block',marginLeft:'2%'}}>
                                  {
                                     this.state.response.factInstance.hasOwnProperty(item.id)?
                                     ( <div className="row" style={{width:'100%'}}>{
                                       this.state.response.factInstance[item.id].map((it,index)=>{
                                         if(this.fact.get(item.id)){
                                           this.fact.get(item.id).push(it.value)
                                         }else{
                                           this.fact.set(item.id,[it.value])
                                         }
                                       return(  <button key={index} title={it.description} type="button"  className="btn  btn-round-xs btn-xs col-sm-4 col-xs-12 col-md-2 traitBtn Values" data-toggle="button" aria-pressed="false" id="trait_facts" >
                                                <div className="snippet tablet">
                                                <div className="figure pull-left">
                                                <img src={Config.api.ROOT_URL+"/biodiv/traits/"+it.icon} width='20px' height='20px'/>
                                                </div>
                                                <span>{it.value}</span>
                                                </div>
                                                </button>
                                              )
                                       })}
                                       </div>
                                     )
                                     :null
                                   }
                                 </div>
                                 <div className="edit_data"  ref={"onclick_edit_"+this.props.id+item.id} style={{display:'none',marginLeft:'2%'}}>{
                                       item.traitTypes.name==='MULTIPLE_CATEGORICAL'?
                                        (
                                           item.dataTypes.name==='COLOR'?
                                           (
                                             <div>multiple color
                                             </div>
                                           ):
                                           (
                                             <div className="btn-group row" data-toggle="buttons" style={{width:'100%'}}>
                                             {

                                                 item.values.map((possible,index)=>{

                                                   if( this.fact.get(item.id) && $.inArray(possible.value,this.fact.get(item.id))>=0)
                                                   {
                                                     this.pushTraitsCheckboxDefault(item.id,possible.value)
                                                     return(

                                                 <label key={index} title={possible.description} ref={"checkboxActive"+item.id+possible.value} className="btn   btn-round-xs btn-xs col-sm-4 col-xs-12 col-md-2 traitBtn active" id="checkbox_select" onClick={this.pushTraitsCheckbox.bind(this,item.id,possible.value)} >
                                                   <input type="checkbox"  name={possible.value} autoComplete="off"  defaultChecked/ >
                                                   <div className="snippet tablet">
                                                       <div className="figure pull-left">

                                                           <img className="pull-left" src={Config.api.ROOT_URL+"/biodiv/traits/"+ possible.icon} width='20px' height='20px'/>
                                                       </div>
                                                       <span>{possible.value}</span>
                                                   </div>
                                                 </label>

                                               )}
                                                 else{
                                                 return(

                                               <label key={index} title={possible.description} ref={"checkboxActive"+item.id+possible.value} className="btn   btn-round-xs btn-xs col-sm-4 col-xs-12 col-md-2 traitBtn" id="checkbox_select" onClick={this.pushTraitsCheckbox.bind(this,item.id,possible.value)} >
                                                 <input type="checkbox" name={possible.value} autoComplete="off" / >
                                                 <div className="snippet tablet">
                                                     <div className="figure pull-left">

                                                         <img className="pull-left" src={Config.api.ROOT_URL+"/biodiv/traits/"+ possible.icon} width='20px' height='20px'/>

                                                     </div>
                                                     <span>{possible.value}</span>
                                                 </div>
                                               </label>

                                             )}
                                                 })
                                             }
                                             </div>
                                           )

                                     ):(
                                          item.traitTypes.name==='SINGLE_CATEGORICAL'?
                                            (
                                              <div className="btn-group row" data-toggle="buttons" style={{width:'100%'}}>
                                              {
                                                  item.values.map((possible,index)=>{

                                                  if( this.fact.get(item.id) && $.inArray(possible.value,this.fact.get(item.id))>=0){
                                                    this.pushTraitsRadioDefault(item.id,possible.value);
                                                    return(

                                                  <label key={index} title={possible.description} ref={"radioActive"+item.id+possible.value} className="btn   btn-round-xs btn-xs col-sm-4 col-xs-12 col-md-2 traitBtn active" id="radio_select" onClick={this.pushTraitsRadio.bind(this,item.id,possible.value)} >
                                                    <input type="radio" name="trait_edit"  id={possible.value}  defaultChecked/ >
                                                    <div className="snippet tablet">
                                                        <div className="figure pull-left">

                                                            <img src={Config.api.ROOT_URL+"/biodiv/traits/"+ possible.icon} width='20px' height='20px'/>

                                                        </div>
                                                        <span>{possible.value}</span>
                                                    </div>
                                                  </label>

                                                )}
                                                  else{
                                                  return(

                                                <label key={index} title={possible.description} ref={"radioActive"+item.id+possible.value} className="btn   btn-round-xs btn-xs col-sm-4 col-xs-12 col-md-2 traitBtn" id="radio_select" onClick={this.pushTraitsRadio.bind(this,item.id,possible.value)} >
                                                  <input type="radio" name="trait_edit" id={possible.value} / >
                                                  <div className="snippet tablet">
                                                      <div className="figure pull-left">

                                                          <img src={Config.api.ROOT_URL+"/biodiv/traits/"+ possible.icon} width='20px' height='20px'/>

                                                      </div>
                                                      <span>{possible.value}</span>
                                                  </div>
                                                </label>

                                              )}
                                                  })
                                            }
                                            </div>
                                          ):
                                          (
                                              item.dataTypes.name==='NUMERIC'?
                                              (
                                                <div className="row" style={{marginTop:'0.7%'}}>
                                                  {
                                                    <div>
                                                    <input type="number" className="col-sm-4 col-xs-6" ref={"rangeNumeric"+item.id+this.props.id} onChange={this.pushTraitsNumericRange.bind(this,item.id)} name={item.name}   style={{border:'1px solid #aaa',borderRadius:'4px'}}/>
                                                    </div>

                                                  }
                                                </div>
                                              ):
                                              (
                                                <div>
                                                <DatePicker  pushTraitsDateRange={this.pushTraitsDateRange} traitId={item.id} units={"month"}/>
                                                </div>
                                              )
                                          )
                                     )
                                }</div>
                            </div>
                        </div>
                      )
                    }
                    else{
                        if(AuthUtils.isLoggedIn()){
                              if(this.state.response.factInstance.hasOwnProperty(item.id)){
                                 return(
                                   <div key={index} className="well well-sm " style={{width:'99%',marginLeft:'0.5%',marginBottom:'0.2%'}}>
                                       <div className="name-and-button row">
                                           <div className="name col-sm-8" style={{margin:'0%'}}>
                                               <a href={Config.api.ROOT_URL+"/trait/show/"+item.id+"/?trait.12=any&max=&offset=0"}>
                                                    <span>{item.name}</span>
                                                </a>
                                           </div>
                                           <div className="buttons col-sm-4">
                                               {
                                                 ((AuthUtils.isLoggedIn() && AuthUtils.getLoggedInUser().id===this.props.owner) || AuthUtils.isAdmin())?
                                                 (
                                                   <a className="btn btn-xs btn-primary pull-right" ref={"edit_"+this.props.id+item.id} style={{display:'block',marginTop:'0%'}} onClick={this.show.bind(this,this.props.id,item.id)} disabled={this.state.loading}>edit</a>
                                                 ):null
                                               }
                                               <a className="btn btn-xs btn-primary pull-right" ref={"cancel_"+this.props.id+item.id} style={{display:'none',marginTop:'0%'}} onClick={this.hide.bind(this,this.props.id,item.id)} disabled={this.state.loading}>cancel</a>
                                               <input className="btn btn-xs btn-primary pull-right" ref={"sub_"+this.props.id+item.id} type="submit" value="submit" style={{display:'none',marginTop:'0%'}} onClick={this.submitTraits.bind(this,item.id,this.props.id,item.traitTypes.name,item.dataTypes.name)} disabled={this.state.loading}/>
                                           </div>
                                       </div>
                                       <div className="traits">
                                             <div className="fact_instance" ref={"fact_"+this.props.id+item.id} style={{display:'block',marginLeft:'2%'}}>
                                             {
                                                this.state.response.factInstance.hasOwnProperty(item.id)?
                                                ( <div className="row" style={{width:'100%'}}>{
                                                  this.state.response.factInstance[item.id].map((it,index)=>{
                                                    if(this.fact.get(item.id)){
                                                      this.fact.get(item.id).push(it.value)
                                                    }else{
                                                      this.fact.set(item.id,[it.value])
                                                    }
                                                  return(  <button key={index} title={it.description} type="button" className="btn   btn-round-xs btn-xs col-sm-4 col-xs-12 col-md-2 traitBtn Values" data-toggle="button" aria-pressed="false" id="trait_facts"  >
                                                           <div className="snippet tablet">
                                                           <div className="figure pull-left">
                                                           <img src={Config.api.ROOT_URL+"/biodiv/traits/"+it.icon} width='20px' height='20px'/>
                                                           </div>
                                                           <span>{it.value}</span>
                                                           </div>
                                                           </button>
                                                         )
                                                  })}
                                                  </div>
                                                )
                                                :null
                                              }
                                            </div>
                                            <div className="edit_data"  ref={"onclick_edit_"+this.props.id+item.id} style={{display:'none',marginLeft:'2%'}}>{
                                                  item.traitTypes.name==='MULTIPLE_CATEGORICAL'?
                                                  (
                                                    item.dataTypes.name==='COLOR'?
                                                    (
                                                      <div>multiple color</div>
                                                    ):
                                                    (
                                                      <div className="btn-group row" data-toggle="buttons" style={{width:'100%'}}>
                                                      {

                                                          item.values.map((possible,index)=>{

                                                            if( this.fact.get(item.id) && $.inArray(possible.value,this.fact.get(item.id))>=0)
                                                            {
                                                              this.pushTraitsCheckboxDefault(item.id,possible.value)
                                                              return(

                                                          <label key={index} title={possible.description} ref={"checkboxActive"+item.id+possible.value} className="btn   btn-round-xs btn-xs col-sm-4 col-xs-12 col-md-2 traitBtn active" id="checkbox_select" onClick={this.pushTraitsCheckbox.bind(this,item.id,possible.value)} >
                                                            <input type="checkbox"  name={possible.value} autoComplete="off"  defaultChecked/ >
                                                            <div className="snippet tablet">
                                                                <div className="figure pull-left">

                                                                    <img className="pull-left" src={Config.api.ROOT_URL+"/biodiv/traits/"+ possible.icon} width='20px' height='20px'/>

                                                                </div>
                                                                <span>{possible.value}</span>
                                                            </div>
                                                          </label>

                                                        )}
                                                          else{
                                                          return(

                                                        <label key={index} title={possible.description} ref={"checkboxActive"+item.id+possible.value} className="btn   btn-round-xs btn-xs col-sm-4 col-xs-12 col-md-2 traitBtn" id="checkbox_select" onClick={this.pushTraitsCheckbox.bind(this,item.id,possible.value)} >
                                                          <input type="checkbox" name={possible.value} autoComplete="off" / >
                                                          <div className="snippet tablet">
                                                              <div className="figure pull-left">

                                                                  <img className="pull-left" src={Config.api.ROOT_URL+"/biodiv/traits/"+ possible.icon} width='20px' height='20px'/>

                                                              </div>
                                                              <span>{possible.value}</span>
                                                          </div>
                                                        </label>

                                                      )}
                                                          })
                                                      }
                                                      </div>
                                                    )
                                                ):(
                                                    item.traitTypes.name==='SINGLE_CATEGORICAL'?
                                                    (
                                                      <div className="btn-group row" data-toggle="buttons" style={{width:'100%'}} >
                                                      {
                                                          item.values.map((possible,index)=>{

                                                          if( this.fact.get(item.id) && $.inArray(possible.value,this.fact.get(item.id))>=0){
                                                            this.pushTraitsRadioDefault(item.id,possible.value);
                                                            return(

                                                          <label key={index} title={possible.description} ref={"radioActive"+item.id+possible.value} className="btn  btn-round-xs btn-xs col-sm-4 col-xs-12 col-md-2 traitBtn active" id="radio_select" onClick={this.pushTraitsRadio.bind(this,item.id,possible.value)} >
                                                            <input type="radio" name="trait_edit"  id={possible.value}  defaultChecked/ >
                                                            <div className="snippet tablet">
                                                                <div className="figure pull-left">

                                                                    <img src={Config.api.ROOT_URL+"/biodiv/traits/"+ possible.icon} width='20px' height='20px'/>

                                                                </div>
                                                                <span>{possible.value}</span>
                                                            </div>
                                                          </label>

                                                        )}
                                                          else{
                                                          return(

                                                        <label key={index} title={possible.description} ref={"radioActive"+item.id+possible.value} className="btn   btn-round-xs btn-xs col-sm-4 col-xs-12 col-md-2 traitBtn" id="radio_select" onClick={this.pushTraitsRadio.bind(this,item.id,possible.value)} >
                                                          <input type="radio" name="trait_edit" id={possible.value} / >
                                                          <div className="snippet tablet">
                                                              <div className="figure pull-left">

                                                                  <img src={Config.api.ROOT_URL+"/biodiv/traits/"+ possible.icon} width='20px' height='20px'/>

                                                              </div>
                                                              <span>{possible.value}</span>
                                                          </div>
                                                        </label>

                                                      )}
                                                          })
                                                    }
                                                    </div>
                                                  ):
                                                  (
                                                      item.dataTypes.name==='NUMERIC'?
                                                      (
                                                        <div className="row" style={{marginTop:'0.7%'}}>
                                                          {
                                                            <div>
                                                            <input type="number" className="col-sm-4 col-xs-6" ref={"rangeNumeric"+item.id+this.props.id} onChange={this.pushTraitsNumericRange.bind(this,item.id)} name={item.name}   style={{border:'1px solid #aaa',borderRadius:'4px'}}/>
                                                            </div>

                                                          }
                                                        </div>
                                                      ):
                                                      (
                                                        <div><DatePicker  pushTraitsDateRange={this.pushTraitsDateRange} traitId={item.id} units={"month"}/></div>
                                                      )
                                                  )

                                                )
                                           }</div>
                                       </div>
                                   </div>
                                 )
                              }
                              else{
                                 if((AuthUtils.isLoggedIn() && AuthUtils.getLoggedInUser().id===this.props.owner) || AuthUtils.isAdmin()) {
                                    return(
                                      <div key={index} className="well well-sm " style={{width:'99%',marginLeft:'0.5%',marginBottom:'0.2%'}}>
                                          <div className="name-and-button row" >
                                              <div className="name col-sm-8" style={{margin:'0%'}}>
                                                  <a href={Config.api.ROOT_URL+"/trait/show/"+item.id+"/?trait.12=any&max=&offset=0"}>
                                                       <span>{item.name}</span>
                                                   </a>
                                              </div>
                                              <div className="buttons col-sm-4">
                                                  <a className="btn btn-xs btn-primary pull-right" ref={"edit_"+this.props.id+item.id} style={{display:'block',marginTop:'0%'}} onClick={this.show.bind(this,this.props.id,item.id)} disabled={this.state.loading}>edit</a>
                                                  <a className="btn btn-xs btn-primary pull-right" ref={"cancel_"+this.props.id+item.id} style={{display:'none',marginTop:'0%'}} onClick={this.hide.bind(this,this.props.id,item.id)} disabled={this.state.loading}>cancel</a>
                                                  <input className="btn btn-xs btn-primary pull-right" ref={"sub_"+this.props.id+item.id} type="submit" value="submit" style={{display:'none',marginTop:'0%'}} onClick={this.submitTraits.bind(this,item.id,this.props.id,item.traitTypes.name,item.dataTypes.name)} disabled={this.state.loading}/>
                                              </div>
                                          </div>
                                          <div className="traits">
                                                <div className="fact_instance" ref={"fact_"+this.props.id+item.id} style={{display:'block',marginLeft:'2%'}}>
                                                {
                                                   this.state.response.factInstance.hasOwnProperty(item.id)?
                                                   ( <div className="row" style={{width:'100%'}}>{
                                                     this.state.response.factInstance[item.id].map((it,index)=>{
                                                       if(this.fact.get(item.id)){
                                                         this.fact.get(item.id).push(it.value)
                                                       }else{
                                                         this.fact.set(item.id,[it.value])
                                                       }
                                                     return(  <button key={index} title={it.description} type="button" className="btn   btn-round-xs btn-xs col-sm-4 col-xs-12 col-md-2 traitBtn Values" data-toggle="button" aria-pressed="false" id="trait_facts" >
                                                              <div className="snippet tablet">
                                                              <div className="figure pull-left">
                                                              <img src={Config.api.ROOT_URL+"/biodiv/traits/"+it.icon} width='20px' height='20px'/>
                                                              </div>
                                                              <span>{it.value}</span>
                                                              </div>
                                                              </button>
                                                            )
                                                     })}
                                                     </div>
                                                   )
                                                   :null
                                                 }
                                               </div>
                                               <div className="edit_data"  ref={"onclick_edit_"+this.props.id+item.id} style={{display:'none',marginLeft:'2%'}}>{
                                                     item.traitTypes.name==='MULTIPLE_CATEGORICAL'?
                                                     (
                                                       item.dataTypes.name==='COLOR'?
                                                       (
                                                         <div>mutiple color</div>
                                                       ):
                                                       (
                                                         <div className="btn-group row" data-toggle="buttons" style={{width:'100%'}}>
                                                         {

                                                             item.values.map((possible,index)=>{

                                                               if( this.fact.get(item.id) && $.inArray(possible.value,this.fact.get(item.id))>=0)
                                                               {
                                                                 this.pushTraitsCheckboxDefault(item.id,possible.value)
                                                                 return(

                                                             <label key={index} title={possible.description} ref={"checkboxActive"+item.id+possible.value} className="btn   btn-round-xs btn-xs col-sm-4 col-xs-12 col-md-2 traitBtn active" id="checkbox_select" onClick={this.pushTraitsCheckbox.bind(this,item.id,possible.value)} >
                                                               <input type="checkbox"  name={possible.value} autoComplete="off"  defaultChecked/ >
                                                               <div className="snippet tablet">
                                                                   <div className="figure pull-left">

                                                                       <img className="pull-left" src={Config.api.ROOT_URL+"/biodiv/traits/"+ possible.icon} width='20px' height='20px'/>

                                                                   </div>
                                                                    <span>{possible.value}</span>
                                                               </div>
                                                             </label>

                                                           )}
                                                             else{
                                                             return(

                                                           <label key={index} title={possible.description} ref={"checkboxActive"+item.id+possible.value} className="btn   btn-round-xs btn-xs col-sm-4 col-xs-12 col-md-2 traitBtn" id="checkbox_select" onClick={this.pushTraitsCheckbox.bind(this,item.id,possible.value)} >
                                                             <input type="checkbox" name={possible.value} autoComplete="off" / >
                                                             <div className="snippet tablet">
                                                                 <div className="figure pull-left">

                                                                     <img className="pull-left" src={Config.api.ROOT_URL+"/biodiv/traits/"+ possible.icon} width='20px' height='20px'/>

                                                                 </div>
                                                                 <span>{possible.value}</span>
                                                             </div>
                                                           </label>

                                                         )}
                                                             })
                                                         }
                                                         </div>
                                                       )

                                                   ):(
                                                      item.traitTypes.name==='SINGLE_CATEGORICAL'?
                                                      (
                                                        <div className="btn-group row" data-toggle="buttons" style={{width:'100%'}}>
                                                        {
                                                            item.values.map((possible,index)=>{

                                                            if( this.fact.get(item.id) && $.inArray(possible.value,this.fact.get(item.id))>=0){
                                                              this.pushTraitsRadioDefault(item.id,possible.value);
                                                              return(

                                                            <label key={index} title={possible.description} ref={"radioActive"+item.id+possible.value} className="btn   btn-round-xs btn-xs col-sm-4 col-xs-12 col-md-2 traitBtn active" id="radio_select" onClick={this.pushTraitsRadio.bind(this,item.id,possible.value)} >
                                                              <input type="radio" name="trait_edit"  id={possible.value}  defaultChecked/ >
                                                              <div className="snippet tablet">
                                                                  <div className="figure pull-left">

                                                                      <img src={Config.api.ROOT_URL+"/biodiv/traits/"+ possible.icon} width='20px' height='20px'/>

                                                                </div>
                                                                <span>{possible.value}</span>
                                                              </div>
                                                            </label>

                                                          )}
                                                            else{
                                                            return(

                                                          <label key={index} title={possible.description} ref={"radioActive"+item.id+possible.value} className="btn   btn-round-xs btn-xs col-sm-4 col-xs-12 col-md-2 traitBtn" id="radio_select" onClick={this.pushTraitsRadio.bind(this,item.id,possible.value)} >
                                                            <input type="radio" name="trait_edit" id={possible.value} / >
                                                            <div className="snippet tablet">
                                                                <div className="figure pull-left">

                                                                    <img src={Config.api.ROOT_URL+"/biodiv/traits/"+ possible.icon} width='20px' height='20px'/>

                                                                </div>
                                                                <span>{possible.value}</span>
                                                            </div>
                                                          </label>

                                                        )}
                                                            })
                                                      }
                                                      </div>
                                                      ):
                                                      (
                                                        item.dataTypes.name==='NUMERIC'?
                                                        (
                                                          <div className="row" style={{marginTop:'0.7%'}}>
                                                            {
                                                              <div>
                                                              <input type="number" className="col-sm-4 col-xs-6" ref={"rangeNumeric"+item.id+this.props.id} onChange={this.pushTraitsNumericRange.bind(this,item.id)} name={item.name}   style={{border:'1px solid #aaa',borderRadius:'4px'}}/>
                                                              </div>

                                                            }
                                                          </div>
                                                        ):
                                                        (
                                                          <div><DatePicker  pushTraitsDateRange={this.pushTraitsDateRange} traitId={item.id} units={"month"}/></div>
                                                        )
                                                      )

                                                   )
                                              }</div>
                                          </div>
                                      </div>
                                    )
                                 }
                              }
                        }
                        else {
                              if(this.state.response.factInstance.hasOwnProperty(item.id))
                              {
                                return(
                                  <div className="well well-sm " style={{width:'99%',marginLeft:'0.5%',marginBottom:'0.2%'}}>
                                      <div className="name-and-button row" >
                                          <div className="name col-sm-8" style={{margin:'0%'}}>
                                              <a href={Config.api.ROOT_URL+"/trait/show/"+item.id+"/?trait.12=any&max=&offset=0"}>
                                                   <span>{item.name}</span>
                                               </a>
                                          </div>
                                          <div className="buttons col-sm-4">
                                              <a className="btn btn-xs btn-primary pull-right" ref={"edit_"+this.props.id+item.id} style={{display:'none',marginTop:'0%'}} onClick={this.show.bind(this,this.props.id,item.id)} disabled={this.state.loading}>edit</a>
                                              <a className="btn btn-xs btn-primary pull-right" ref={"cancel_"+this.props.id+item.id} style={{display:'none',marginTop:'0%'}} onClick={this.hide.bind(this,this.props.id,item.id)} disabled={this.state.loading}>cancel</a>
                                              <input className="btn btn-xs btn-primary pull-right" ref={"sub_"+this.props.id+item.id} type="submit" value="submit" style={{display:'none',marginTop:'0%'}} onClick={this.submitTraits.bind(this,item.id,this.props.id,item.traitTypes.name,item.dataTypes.name)} disabled={this.state.loading}/>
                                          </div>
                                      </div>
                                      <div className="traits">
                                            <div className="fact_instance" ref={"fact_"+this.props.id+item.id} style={{display:'block',marginLeft:'2%'}}>
                                            {
                                               this.state.response.factInstance.hasOwnProperty(item.id)?
                                               ( <div className="row" style={{width:'100%'}}>{
                                                 this.state.response.factInstance[item.id].map((it,index)=>{
                                                   if(this.fact.get(item.id)){
                                                     this.fact.get(item.id).push(it.value)
                                                   }else{
                                                     this.fact.set(item.id,[it.value])
                                                   }
                                                 return(  <button key={index} title={it.description} type="button" className="btn   btn-round-xs btn-xs col-sm-4 col-xs-12 col-md-2 traitBtn Values" data-toggle="button" aria-pressed="false" id="trait_facts" >
                                                          <div className="snippet tablet">
                                                          <div className="figure pull-left">
                                                          <img src={Config.api.ROOT_URL+"/biodiv/traits/"+it.icon} width='20px' height='20px'/>
                                                          </div>
                                                          <span>{it.value}</span>
                                                          </div>
                                                          </button>
                                                        )
                                                 })}
                                                 </div>
                                               )
                                               :null
                                             }
                                           </div>
                                      </div>
                                  </div>
                                )
                              }
                        }
                    }
                })
              ):null
       }
       </div>
       )
   }

}
function mapStateToProps(state){
return {Login:state.Login};
}

function mapDispatchToProps(dispatch){


}

 export default connect(mapStateToProps,null)(Traits);
