import IconMotionPickup from '../assets/icon_motion_pickup.png'
import IconVitalDrink from '../assets/icon_vitaldrink.png'
import IconRefresher from '../assets/icon_refresher.png'
import HealSkill from '../assets/heal_spell.png'

export type FixedArray<TItem, TLength extends number> = [TItem, ...TItem[]] & { length: TLength }

export const slotTypes = ["Unused", "Food", "Pill", "HealSkill", "MpRestorer", "FpRestorer", "PickupPet", "PickupMotion", "AttackSkill", "BuffSkill", "Flying"] as const;
export const thresholdSlotTypes = ["Food", "Pill", "HealSkill", "MpRestorer", "FpRestorer"];
export const cooldownSlotTypes = ["Food", "Pill", "HealSkill", "AttackSkill", "BuffSkill", "MpRestorer", "FpRestorer", "PickupPet"];
export const farmingSlotsBlacklist = ["HealSkill", "Flying"]
export const supportSlotsBlacklist = ["PickupPet", "PickupMotion", "AttackSkill"]

export type SlotType = typeof slotTypes[number];

export const createSlotBars = () => (
    [...new Array(9)].map(_ => ({slots:[...new Array(10)].map(_ => ({ slot_type: 'Unused', slot_enabled: false } as SlotModel))})) as SlotBars
)

export const SLOT_SIZE_PX = 40;

export const translateType = (type: SlotType) => {
    switch (type) {
        case 'Unused': return ''
        case 'Food': return '🍔'
        case 'Pill': return '💊'
        case 'HealSkill': return HealSkill
        case 'MpRestorer': return IconRefresher
        case 'FpRestorer': return IconVitalDrink
        case 'PickupPet': return '🐶'
        case 'PickupMotion': return IconMotionPickup
        case 'AttackSkill': return '🗡️'
        case 'BuffSkill': return '🪄'
        case 'Flying': return '✈️'
    }
}

export const translateDesc = (type: SlotType, defaultUnused: string = '') => {
    switch (type) {
        case 'Unused': return [defaultUnused, defaultUnused]
        case 'Food': return ['Food','Food']
        case 'Pill': return ['Pill','Pill']
        case 'HealSkill': return ["Heal",'Heal skill']
        case 'MpRestorer': return ['MP', 'MP restorer']
        case 'FpRestorer': return ['FP', 'FP restorer']
        case 'PickupPet': return ['Pet', 'Pickup pet']
        case 'PickupMotion': return ['Pickup', 'Pickup motion']
        case 'AttackSkill': return ['Attack', 'Attack skill']
        case 'BuffSkill': return ['Buff', 'Buff skill']
        case 'Flying': return ['Board', 'Board']
    }
}
export type SlotModel = {
    slot_type: SlotType,
    slot_cooldown?: number,
    slot_threshold?: number,
    slot_enabled: boolean,
}
export type SlotBarHolder = {
    slots: SlotBarModel
}

type SlotBarModel = FixedArray<SlotModel, 10>
export type SlotBars = FixedArray<SlotBarHolder, 9>

export type ModeModel = "Farming" | "Support" | "AutoShout"

export type FarmingConfigModel = Partial<{
    [key: string]: any;
    on_demand_pet: boolean,
    use_attack_skills: boolean,
    stay_in_area: boolean,
    slot_bars: SlotBars,
    circle_pattern_rotation_duration: number,

    passive_mobs_colors: number[];
    passive_tolerence: number;
    aggressive_mobs_colors: number[];
    aggressive_tolerence: number;

    is_stop_fighting: boolean;
    prevent_already_attacked: boolean;

    obstacle_avoidance_enabled: boolean,
    obstacle_avoidance_cooldown: number,
    obstacle_avoidance_max_try: number,
    obstacle_avoidance_only_passive: boolean,

    min_mobs_name_width: number,
    max_mobs_name_width: number,

    min_hp_attack: number,


}>

export type SupportConfigModel = Partial<{
    [key: string]: any;
    slot_bars: SlotBars,
    jump_cooldown: number,
}>

export type ShoutConfigModel = Partial<{
    [key: string]: any;
    shout_interval: number,
    shout_messages: string[],
}>

export type BotConfigModel = {
    change_id: number,
    is_running: boolean,
    mode?: ModeModel,
    farming_config: FarmingConfigModel,
    support_config: SupportConfigModel,
    shout_config: ShoutConfigModel,
}

export type AnyConfig = FarmingConfigModel | SupportConfigModel | ShoutConfigModel
