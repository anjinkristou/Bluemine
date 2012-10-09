qx.Class.define("bluemine.Service", {
    extend: qx.core.Object,
    type: 'singleton',
/*
    properties: {
        account: {
            nullable: true,
            event: 'changeAccount',
            apply: '_applyAccount'
        }
    },

    events: {
        message: 'qx.event.type.Data'
    },
*/
    members: {
        _call: function(method, args) {
            var store = new qx.data.store.Json('/svc/'+method+'.json?'+
                qx.lang.Json.stringify(args), 'GET', 'application/json',
                {
                    configureRequest:function(request) {
                        request.setProhibitCaching(false);
                    }
                });
            return store;
        },

        register: function(email, password) {
            var store = this._call('register', {email:email, password:password});
            store.bind("model.account", this, "account");
            this.setMob(null);
            return store;
        },

        login: function(email, password) {
            var store = this._call('login', {email:email, password:password});
            store.bind("model.account", this, "account");
            this.setMob(null);
            return store;
        },

        logout: function() {
            var store = this._call('logout', {});
            this.setAccount(null);
            return store;
        }
    }
});