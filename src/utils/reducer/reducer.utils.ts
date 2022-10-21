import { AnyAction } from "redux";

type Matchable<AC extends () => AnyAction> = AC & {
    type: ReturnType<AC> ['type'] //reach into the action, get the type value and set it to this type
    match(action: AnyAction): action is ReturnType<AC>;
}

export function withMatcher<AC extends () => AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>;

export function withMatcher<AC extends (...args: any[]) => AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>;

// function that allows to receive any kind of action creator and check the type
export function withMatcher(actionCreator: Function) { //generic function
    const type = actionCreator().type; //type value
    return Object.assign(actionCreator, {
        type,
        match(action: AnyAction) {
            return action.type === type;
        }
    })
}

// action with a payload
export type ActionWithPayload<T, P> = {
    type: T;
    payload: P;
};

// action without a payload
export type Action<T> = {
    type: T;
};

export function createAction<T extends string, P>(
    type: T, 
    payload: P
): ActionWithPayload<T, P>;

export function createAction<T extends string>(
    type: T, 
    payload: void
): Action<T>;

export function createAction<T extends string, P>(
    type: T, 
    payload: P
    ){ return { type, payload };
}

