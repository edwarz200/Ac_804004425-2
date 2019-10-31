'use strict'

var express = require('express'),
    Cexec = require('child_process').exec

exports.conexec = ((id,cb) => {
    Cexec('start APP-' + id + '.bat', cb)
})