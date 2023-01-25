// We create a Railway Ticket Reservation using Redux:
// Action:
// A Person who is submitting the form:
const newBooking = (name, amount) => {
    return {
        type: "NEW_BOOKING",
        payload: {
            name,
            amount
        }
    }
}

const cancelBooking = (name, refundAmount) => {
    return {
        type: "CANCEL_BOOKING",
        payload: {
            name,
            refundAmount
        }
    }
}

// Reducers:
const reservationHistory = (oldReservationList=[], action) => {
    if(action.type === "NEW_BOOKING") {
        // return oldReservationList.push(action.payload.name);
        return [...oldReservationList, action.payload];
    } else if(action.type === "CANCEL_BOOKING") {
        return oldReservationList.filter((record) => {
            return record.name !== action.payload.name;
            // return record !== action.payload.name;
        })
    } else {
        return oldReservationList;
    }
}

const cancellationHistory = (oldCancellationList=[], action) => {
    if(action.type === "CANCEL_BOOKING") {
        return [...oldCancellationList, action.payload];
    } else {
        return oldCancellationList;
    }
}

const accounting = (totalMoney = 100, action) => {
    if(action.type === "NEW_BOOKING") {
        return totalMoney + action.payload.amount;
    } else if(action.type === "CANCEL_BOOKING") {
        return totalMoney - action.payload.refundAmount;
    } else {
        return totalMoney;
    }
}

// STORE:
console.log(Redux);
const { createStore, combineReducers } = Redux;

const railwayCentralStore = combineReducers({
    accounting: accounting,
    reservationHistory: reservationHistory,
    cancellationHistory: cancellationHistory
});

const store = createStore(railwayCentralStore);

const action = newBooking('Karachi', 30);
store.dispatch(action);
store.dispatch(newBooking('Lahore', 10));
store.dispatch(newBooking('Islamabad', 20));
store.dispatch(cancelBooking('Karachi', 15));
console.log(store.getState());