
var favoriteCookie = $.cookie("kancha");
// console.log(favoriteCookie)

var fancydata;
$(document).ready(function () {

    $("#txtRatedifferent").on('keyup', function (e) {

        if ($('#txtRatedifferent').val() < 1 || $('#txtRatedifferent').val() > 100) {

            $.toast({

                heading: 'Warning',

                text: "Rate Difference between(1-100)",

                showHideTransition: 'fade',

                icon: 'warning'

            })

            $('#txtRatedifferent').val(1)

        }

    })
    $("#maxstakeperrate").on('keyup', function (e) {

        if ($('#maxstakeperrate').val() < 1 || $('#maxstakeperrate').val() > 5000000000) {

            $.toast({

                heading: 'Warning',

                text: "Max Stake Per Rate between(1-5000000000)",

                showHideTransition: 'fade',

                icon: 'warning'

            })

            $('#maxstakeperrate').val(10000000)

        }

    })
    $("#txtMaxStack").on('keyup', function (e) {

        if ($('#txtMaxStack').val() < 1 || $('#txtMaxStack').val() > 50000000) {

            $.toast({

                heading: 'Warning',

                text: "Min and Max Stake between(1-50000000)",

                showHideTransition: 'fade',

                icon: 'warning'

            })

            $('#txtMaxStack').val(10000000)

        }

    })
    $("#txtMinStack").on('keyup', function (e) {


        if ($('#txtMinStack').val() < 1 || $('#txtMinStack').val() > 50000000) {

            $.toast({

                heading: 'Warning',

                text: "Min and Max Stake between(1-50000000)",

                showHideTransition: 'fade',

                icon: 'warning'

            })

            $('#txtMinStack').val(100)

        }

    })
    $("#txtRateRang").on('keyup', function (e) {
        if ($('#txtRateRang').val() < 1 || $('#txtRateRang').val() > 100) {
            $.toast({
                heading: 'Warning',
                text: "fancy Rate between(1-100)",
                showHideTransition: 'fade',
                icon: 'warning'
            })
            $('#txtRateRang').val(1)
        }
    })

});

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
$(document).ready(function () {

    $('#save-shortcut-key').click(function () {
        SaveKeyShortcuts();
    });
    $('#rbtnInactive').click(function () {
        $("input[name='rbtnstatus'][value='2']").prop('checked', true);
        UpdBetStatus(2);
    });
    $('#rbtnClose').click(function () {
        $("input[name='rbtnstatus'][value='6']").prop('checked', true);
        UpdBetStatus(6);
    });
    // $("input[name='rbtnstatus']").on("change", function () {
    //      UpdateBallStatus(this.value);
    // });
    function preventtext(e) {
        var keyCode = (e.keyCode ? e.keyCode : e.which);
        if (keyCode > 65 && keyCode < 90) {
            e.preventDefault();
        }
    }


    $("#txtRateformula").on('keyup', function (e) {

        var num = $(this).val();
        if (num == '' || num == null) {
            num = 0;
        }
        if ($("#txtRateformula").val() != null) {
            var numb = num.match(/\d/g);
            numb = numb.join("");
        }
        var raterange = $("#txtRateRang").val();
        var raterangeplus = parseInt(raterange) + parseInt(numb);
        var raterangeminus = parseInt(numb) - parseInt(raterange);
        if (raterangeminus < 0) {
            raterangeminus = 0;
        }
        var raterangedisplay = raterangeminus + "-" + raterangeplus;
        $("#spanRang").text(raterangedisplay);


        // if ($("#txtNoRate1").val()=='') {
        $("#txtNoRate1").val(numb);
        //  preventtext(e);
        // }
        var num2 = $("#txtRatedifferent").val();
        if (num2 == '') {
            num2 = 0;
        }
        var num3 = parseInt(num) + parseInt(num2);
        if (e.keyCode != 13) {
            $("#txtYesRate1").val(num3);
            $('#txtNoPoint1').val(100);
            $('#txtYesPoint1').val(100);
        }
    });

    // Code For Don't Allow Characters In Password Field
    $("#FancyPassword").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
            // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    $(document).on('keyup', function (e) {
        // if (e.which == 13) {
        //     UpdateFancyRate(); 
        //     // if ($('#txtRateformula').val()!='') {
        //     //     $('#txtNoPoint1').val(100)
        //     //     $('#txtYesPoint1').val(100)
        //     // }
        // }
        if (e.which == 8) {
            if ($('#txtRateformula').val() == '') {
                $("#txtNoPoint1").val('');
                $("#txtYesPoint1").val('');
                $("#txtNoRate1").val('');
                $("#txtYesRate1").val('');
                $("#spanRang").text('-');

            }

        }

        if (e.which == 13) {
            e.preventDefault();
            if ($('#txtRateformula').val() == '') {
                $.toast({
                    heading: 'Warning',
                    text: "Please Enter Rates",
                    showHideTransition: 'fade',
                    icon: 'warning'
                })

                return false;
            }

            if ($("#rbtnActive").prop('checked') == false) {
                $("#rbtnActive").prop('checked', true);
                UpdateBallStatus(1);
                UpdateFancyRate();
            } else if ($("#rbtnActive").prop('checked') == true) {
                if (event.keyCode === 13 && event.altKey) {
                    UpdateFancyRate();
                } else {
                    $("#rbtndeActive").prop('checked', true);
                    UpdateBallStatus(2);
                }

            }
        }
        if (e.which == 65) {
            $("#txtNoPoint1").val($("#txtANoRate").val());
            $("#txtYesPoint1").val($("#txtAYesRate").val());
            $('#txtYesRate1').val($('#txtNoRate1').val());
        }
        if (e.which == 66) {
            $("#txtNoPoint1").val($("#txtBNoRate").val());
            $("#txtYesPoint1").val($("#txtBYesRate").val());
            $('#txtYesRate1').val($('#txtNoRate1').val());
        }
        if (e.which == 67) {
            $("#txtNoPoint1").val($("#txtCNoRate").val());
            $("#txtYesPoint1").val($("#txtCYesRate").val());
            $('#txtYesRate1').val($('#txtNoRate1').val());
        }
        if (e.which == 68) {
            $("#txtNoPoint1").val($("#txtDNoRate").val());
            $("#txtYesPoint1").val($("#txtDYesRate").val());
            $('#txtYesRate1').val($('#txtNoRate1').val());
        }
        if (e.which == 69) {
            $("#txtNoPoint1").val($("#txtENoRate").val());
            $("#txtYesPoint1").val($("#txtEYesRate").val());
            $('#txtYesRate1').val($('#txtNoRate1').val());
        }
        if (e.which == 70) {
            $("#txtNoPoint1").val($("#txtFNoRate").val());
            $("#txtYesPoint1").val($("#txtFYesRate").val());
            $('#txtYesRate1').val($('#txtNoRate1').val());
        }
        if (e.which == 71) {
            $("#txtNoPoint1").val($("#txtGNoRate").val());
            $("#txtYesPoint1").val($("#txtGYesRate").val());
            $('#txtYesRate1').val($('#txtNoRate1').val());
        }
        if (e.which == 72) {
            var Hvalue = $("#txtHRate").val();
            var norate = $('#txtNoRate1').val();
            var addnum = parseInt(norate) + parseInt(Hvalue);
            $('#txtYesRate1').val(addnum);
            $('#txtNoPoint1').val(100);
            $('#txtYesPoint1').val(100);
        }
        if (e.which == 73) {
            $("#txtNoPoint1").val($("#txtINoRate").val());
            $("#txtYesPoint1").val($("#txtIYesRate").val());
            $('#txtYesRate1').val($('#txtNoRate1').val());
        }
        if (e.which == 74) {
            var Jvalue = $("#txtJRate").val();
            var norate = $('#txtNoRate1').val();
            var addnum = parseInt(norate) + parseInt(Jvalue);
            $('#txtYesRate1').val(addnum);
            $('#txtNoPoint1').val(100);
            $('#txtYesPoint1').val(100);
        }
        if (e.which == 75) {
            $("#txtNoPoint1").val($("#txtCustNopoint").val());
            $('#txtYesRate1').val($('#txtNoRate1').val());
            $("#txtYesPoint1").val($("#txtCustYespoint").val());
        }
        if (e.which == 76) {
            $("#txtNoPoint1").val($("#txtLNoRate").val());
            $('#txtYesRate1').val($('#txtNoRate1').val());
            $("#txtYesPoint1").val($("#txtLYesRate").val());
        }
        if (e.which == 77) {
            $("#txtNoPoint1").val($("#txtMNoRate").val());
            $('#txtYesRate1').val($('#txtNoRate1').val());
            $("#txtYesPoint1").val($("#txtMYesRate").val());
        }
        if (e.which == 78) {
            $("#txtNoPoint1").val($("#txtNNoRate").val());
            $('#txtYesRate1').val($('#txtNoRate1').val());
            $("#txtYesPoint1").val($("#txtNYesRate").val());
        }
        if (e.which == 79) {
            $("#txtNoPoint1").val($("#txtONoRate").val());
            $('#txtYesRate1').val($('#txtNoRate1').val());
            $("#txtYesPoint1").val($("#txtOYesRate").val());
        }
        if (e.which == 80) {
            $("#txtNoPoint1").val($("#txtPNoRate").val());
            $('#txtYesRate1').val($('#txtNoRate1').val());
            $("#txtYesPoint1").val($("#txtPYesRate").val());
        }
        if (e.which == 81) {
            $("#txtNoPoint1").val($("#txtQNoRate").val());
            $('#txtYesRate1').val($('#txtNoRate1').val());
            $("#txtYesPoint1").val($("#txtQYesRate").val());
        }
        if (e.which == 82) {
            $("#txtNoPoint1").val($("#txtRNoRate").val());
            $('#txtYesRate1').val($('#txtNoRate1').val());
            $("#txtYesPoint1").val($("#txtRYesRate").val());
        }
        if (e.which == 83) {
            $("#txtNoPoint1").val($("#txtSNoRate").val());
            $('#txtYesRate1').val($('#txtNoRate1').val());
            $("#txtYesPoint1").val($("#txtSYesRate").val());
        }
        if (e.which == 84) {
            $("#txtNoPoint1").val($("#txtTNoRate").val());
            $('#txtYesRate1').val($('#txtNoRate1').val());
            $("#txtYesPoint1").val($("#txtTYesRate").val());
        }
        if (e.which == 85) {
            $("#txtNoPoint1").val($("#txtUNoRate").val());
            $('#txtYesRate1').val($('#txtNoRate1').val());
            $("#txtYesPoint1").val($("#txtUYesRate").val());
        }
        if (e.which == 86) {
            $("#txtNoPoint1").val($("#txtVNoRate").val());
            $('#txtYesRate1').val($('#txtNoRate1').val());
            $("#txtYesPoint1").val($("#txtVYesRate").val());
        }
        if (e.which == 87) {
            $("#txtNoPoint1").val($("#txtWNoRate").val());
            $('#txtYesRate1').val($('#txtNoRate1').val());
            $("#txtYesPoint1").val($("#txtWYesRate").val());
        }
        if (e.which == 88) {
            $("#txtNoPoint1").val($("#txtXNoRate").val());
            $('#txtYesRate1').val($('#txtNoRate1').val());
            $("#txtYesPoint1").val($("#txtXYesRate").val());
        }
        if (e.which == 89) {
            $("#txtNoPoint1").val($("#txtYNoRate").val());
            $('#txtYesRate1').val($('#txtNoRate1').val());
            $("#txtYesPoint1").val($("#txtYYesRate").val());
        }
        if (e.which == 90) {
            $("#txtNoPoint1").val($("#txtZNoRate").val());
            $('#txtYesRate1').val($('#txtNoRate1').val());
            $("#txtYesPoint1").val($("#txtZYesRate").val());
        }

        // if (e.which == 65 && e.altKey) {
        //      $("input[name='rbtnstatus'][value='1']").prop('checked',true);
        //      UpdateBallStatus(1);
        //        }
        //    if (e.which == 66 && e.altKey) {
        //      $("input[name='rbtnstatus'][value='2']").prop('checked',true);
        //      UpdateBallStatus(2);
        //        }

    });
    $('#txtMaxStack').blur(function () {
        UpdFancySettings();
    });
    $('#txtMinStack').blur(function () {
        UpdFancySettings();
    });
    $('#txtRatedifferent').blur(function () {
        UpdFancySettings();
    });
    $('#txtRateRang').blur(function () {
        UpdFancySettings();
    });
    $('#maxstakeperrate').blur(function () {
        UpdFancySettings();
    });
    $("#ChkIsBetAllow").click(function () {
        if ($("#ChkIsBetAllow").prop('checked') == true) {
            UpdateFancyBetStatus(1);
        } else {
            UpdateFancyBetStatus(0);
        }
    })
    $("#ChkIsApplyCommissin").click(function () {
        if ($("#ChkIsApplyCommissin").prop('checked') == true) {
            UpdateFancyCommStatus(1);
        } else {
            UpdateFancyCommStatus(0);
        }
    })

})

var urlFid = getUrlParameter("f_id");
$("#Fancyid").val(urlFid);
// setInterval("FancyBets()", 1000);
function FancyBets() {

    var FID = $("#Fancyid").val();
    if (FID == undefined) {
        return false;
    }
    $.ajax({
        url: 'http://www.funsports.win/Main/Admin.svc/FancyRates/FancyBets?id=' + FID,
        method: 'GET',
        async: true,
        crossDomain: true,
        headers: {
            "Token": favoriteCookie
        },
        success: function (res) {
            console.log(res.data.length);
            $("#totaldatacount").text(res.data.length)
            if (res.description.status == "Success") {
                $("#fancybooklist thead tr th.thvalue").remove();
                $("#fancybooklist tbody tr th.Totalvalue").remove();
                $("#fancybooklist tfoot tr td.tdvalue").remove();
                $.each(res.fancybook, function (key, value) {
                    var thvalue = value.Key;
                    var tdvalue = value.Value;
                    if (parseInt(tdvalue) < 0) {
                        classname = 'redval';
                    }
                    if (parseInt(tdvalue) >= 0) {
                        classname = 'greenval';
                    }
                    $("#fancybooklist thead tr").append('<th class="thvalue">' + thvalue + '</th>');
                    $("#fancybooklist tfoot tr").append('<td class="tdvalue ' + classname + '" id="book' + thvalue + '">' + tdvalue + '</td>');
                    $("#fancybooklist tbody tr").append('<th class="Totalvalue ' + classname + '">' + tdvalue + '</th>');
                });
                $("#Fancy-Bet-List").dataTable().fnClearTable();;
                // $("#Fancy-Bet-List tbody").empty();
                $.each(res.data, function (key, value) {
                    var backLay = value.backLay;
                    var dlName = value.dlName;
                    var id = value.id;
                    var matchedTime = value.matchedTime;
                    var mdlName = value.mdlName;
                    var pnl = value.pnl;
                    var rate = value.rate;
                    var score = value.score;
                    var source = value.source;
                    var stake = value.stake;
                    var userName = value.userName;
                    var score = value.score;
                    var source = value.source;
                    var sourceInfo = value.sourceInfo;
                    // if (source==="web") {
                    //     // var sourcetext='text-secondary'
                    //     source='<i class="fa fa-desktop fa-2" aria-hidden="true"></i>'
                    // }
                    // else{
                    //     // sourcetext='text-warning';
                    //     source='<i class="fa fa-mobile fa-3" aria-hidden="true" style="font-size: 20px;"></i>'
                    // }
                    // var row_data = ['<button class="btn btn-danger btn-xs" title="Reject Fancy Bet" onclick="cancelbetid(\'' + id + '\')" data-toggle="modal" data-target="#Reject-Bet" title="Reject Fancy Bet">X</button>',id, mdlName, dlName, userName, backLay, score+'/'+rate, stake,matchedTime,'<a href="javascript:void(0)" data-toggle="tooltip" data-placement="left" title="'+sourceInfo+'" style="font-weight:bolder">'+source+'</a>'];
                    var row_data = ['<input type="checkbox" name="fancycheckbx" value="' + id + '">', '<button class="btn btn-danger btn-xs" title="Reject Fancy Bet" onclick="cancelbetid(\'' + id + '\')" data-toggle="modal" data-target="#Reject-Bet" title="Reject Fancy Bet">X</button>', '<a href="javascript:void(0)" data-toggle="tooltip" data-placement="right" title="MDL: ' + mdlName + '  ,DL: ' + dlName + ' " style="font-weight:bolder;font-size:20px;"><i class="fa fa-question-circle fa-4" aria-hidden="true"></i></a>', userName, backLay, score + '/' + rate, stake, matchedTime, '<a href="javascript:void(0)" data-toggle="tooltip" data-placement="left" title="' + sourceInfo + '" style="font-weight:bolder">' + source + '</a>'];


                    if (backLay == "no") {
                        var bagcss = 'background:#ffc9d8'
                    }
                    else {
                        bagcss = 'background:#ace0ff'
                    }
                    $('#Fancy-Bet-List').dataTable().fnAddData(row_data);
                    theNode = $('#Fancy-Bet-List').dataTable().fnSettings().aoData[key].nTr;
                    theNode.setAttribute('style', bagcss);
                    // if (backLay == "no") {
                    //     $('#Fancy-Bet-List tbody').append('<tr class="matchbet backbet repbetcounter" id="trMarket3600_laybets_'+id+'" > <td><button class="btn btn-danger btn-xs" title="Reject Fancy Bet" onclick=RejectFancyBets(\'' + id + '\')>X</button></td> <td>' + id + '</td> <td>' + mdlName + '</td> <td> ' + dlName + '</td> <td> ' + userName + '</td><td>' + backLay + '</td> <td> <b>'+score+'/' + rate + '</b> </td> <td> <b>' + stake + '</b> </td> <td>' + matchedTime + '</td> <td class="text-center bg-white"><a href="javascript:void(0)" class="'+sourcetext+'" data-toggle="tooltip" data-placement="left" title="'+sourceInfo+'"><b>'+source+'</b></a></td> </tr>');
                    //     $('#trMarket3600_laybets_'+id+'').css('background','#ffc9d8');
                    // } else if (backLay == "yes") {
                    //     $('#Fancy-Bet-List tbody').append('<tr class="matchbet laybet repbetcounter" id="trMarket3600_backbets_'+id+'"> <td> <button class="btn btn-danger btn-xs" title="Reject Fancy Bet" onclick=RejectFancyBets(\'' + id + '\')>X</button> </td> <td>' + id + '</td> <td>' + mdlName + '</td> <td> ' + dlName + '</td> <td> ' + userName + '</td><td>' + backLay + '</td> <td> <b>'+score+'/' + rate + '</b> </td> <td> <b>' + stake + '</b> </td> <td>' + matchedTime + '</td> <td class="text-center bg-white"><a href="javascript:void(0)" class="'+sourcetext+'" data-toggle="tooltip" data-placement="left" title="'+sourceInfo+'"><b>'+source+'</b></a></td> </tr>');
                    //     $('#trMarket3600_backbets_'+id+'').css('background','#ace0ff');   
                    // }
                })
                $('[data-toggle="tooltip"]').tooltip();
                // $('#Fancy-Bet-List').DataTable({
                //      pageLength: 50,
                //  });

            }
            if (res.description.status == "Failed") {
                $.toast({
                    heading: 'Error',
                    text: res.description.status,
                    showHideTransition: 'fade',
                    icon: 'error'
                })
            }
        },
        error: function (err) {
            if (err.status == 401) {
                window.location.href = "login.html";
            }
        }
    })
}

function cancelbetid(id) {
    $('#rejectbetid').val(id);
    $('#FancyPassword').val('');
}

$('#allfancycheckbox').click(function () {
    if ($(this).prop('checked') == true) {
        $('input[name="fancycheckbx"]').prop('checked', true);
        $("#RejectAllfancy").css("display", "block");
    } else {
        $('input[name="fancycheckbx"]').prop('checked', false);
        $("#RejectAllfancy").css("display", "none");
    }
});
function selectchkboxids() {
    var ids = "";
    var id;
    $('input[name="fancycheckbx"]:checked').each(function (i) {
        ids += $(this).val() + ",";
        id = ids.substring(0, ids.length - 1);
    });
    console.log(id);
    $('#rejectMultibetids').val(id);
}

function RejectBetsMulti() {
    var ids = $('#rejectMultibetids').val();
    var inputpass = $("#FancyMultiPassword").val();
    var pass = "1" + inputpass + "9";
    var mtid = getUrlParameter("f_mtid");
    $.ajax({
        url: 'http://www.funsports.win/Main/Admin.svc/FancyRates/RejectBetsMulti?ids=' + ids + '&mtid=' + mtid + '&pwd=' + pass,
        method: 'POST',
        crossDomain: true,
        async: true,
        headers: {
            "Token": favoriteCookie
        },
        success: function (res) {
            if (res.status == "Success") {
                $("#RejectAllfancy").css("display", "none");
                $("#allfancycheckbox").prop("checked", false);
                $('#Reject-multi-Bet button[data-dismiss="modal"]').click();
                $.toast({
                    heading: 'Success',
                    text: res.result,
                    showHideTransition: 'slide',
                    icon: 'success'
                })
            }
            if (res.status == "Failed") {
                $.toast({
                    heading: 'Error',
                    text: res.result,
                    showHideTransition: 'fade',
                    icon: 'error'
                })
            }
        },
        error: function (err) {
            if (err.status == 401) {
                window.location.href = "login.html";
            }
        }
    });
}

function RejectFancyBets() {
    var id = $('#rejectbetid').val();
    var inputpass = $("#FancyPassword").val();
    var pass = "1" + inputpass + "9";
    $.ajax({
        url: 'http://www.funsports.win/Main/Admin.svc/FancyRates/RejectFancyBets?id=' + id + '&pwd=' + pass,
        method: 'POST',
        crossDomain: true,
        async: true,
        headers: {
            "Token": favoriteCookie
        },
        success: function (res) {
            if (res.status == "Success") {
                $('#Reject-Bet button[data-dismiss="modal"]').click();
                $.toast({
                    heading: 'Success',
                    text: res.result,
                    showHideTransition: 'slide',
                    icon: 'success'
                })
            }
            if (res.status == "Failed") {
                $.toast({
                    heading: 'Error',
                    text: res.result,
                    showHideTransition: 'fade',
                    icon: 'error'
                })
            }
        },
        error: function (err) {
            if (err.status == 401) {
                window.location.href = "login.html";
            }
        }
    });
}

function GetFancyInfobyId() {
    $.ajax({
        url: 'http://www.funsports.win/Main/Admin.svc/Fancy/GetFancyInfobyId?id=' + urlFid,
        method: 'GET',
        headers: {
            "Token": favoriteCookie
        },
        success: function (res) {
            // console.log(res);

            fancydata = res.data;

            // var fancydata = JSON.parse(localStorage.getItem("fancyData"));
            var sprtname = fancydata.sportName;
            var trnamentname = fancydata.tournamentName;
            var matchname = fancydata.matchName;
            var fancyname = fancydata.fancyName;
            var maxstake = fancydata.maxStake;
            var minstake = fancydata.minStake;
            var applycomm = fancydata.isApplyComm;
            var betallow = fancydata.isBetAllow;
            var ratediff = fancydata.rateDifference;
            var isactive = fancydata.isActive;
            var stakeperrate = fancydata.maxStakePerRate;
            var raterange = fancydata.rateRange;
            $('#Sport').text(sprtname);
            $('#Tournament').text(trnamentname);
            $('#Matchname').text(matchname);
            $('#Fancyname').text(fancyname);
            $('#txtMaxStack').val(maxstake);
            $('#txtMinStack').val(minstake);
            $('#txtRatedifferent').val(ratediff);
            $('#maxstakeperrate').val(stakeperrate);
            $('#txtRateRang').val(raterange);

            if (betallow == 1) {
                $('#ChkIsBetAllow').prop('checked', true);
            } else {
                $('#ChkIsBetAllow').prop('checked', false);
            }
            if (applycomm == 1) {
                $('#ChkIsApplyCommissin').prop('checked', true);
            } else {
                $('#ChkIsApplyCommissin').prop('checked', false);
            }
            if (isactive == 1) {
                $('#rbtnInactive').prop('checked', false);
            } else {
                $('#rbtnInactive').prop('checked', true);
            }

        },
        error: function (err) {

        }
    })
}

function SaveKeyShortcuts() {
    var data = {
        "a": $("#txtANoRate").val() + ',' + $("#txtAYesRate").val(),
        "b": $("#txtBNoRate").val() + ',' + $("#txtBYesRate").val(),
        "c": $("#txtCNoRate").val() + ',' + $("#txtCYesRate").val(),
        "d": $("#txtDNoRate").val() + ',' + $("#txtDYesRate").val(),
        "e": $("#txtENoRate").val() + ',' + $("#txtEYesRate").val(),
        "f": $("#txtFNoRate").val() + ',' + $("#txtFYesRate").val(),
        "g": $("#txtGNoRate").val() + ',' + $("#txtGYesRate").val(),
        "h": $("#txtHRate").val() + ',' + '0',
        "i": $("#txtINoRate").val() + ',' + $("#txtIYesRate").val(),
        "j": $("#txtJRate").val() + ',' + '0',
        "k": $("#txtCustNopoint").val() + ',' + $("#txtCustYespoint").val(),
        "l": $("#txtLNoRate").val() + ',' + $("#txtLYesRate").val(),
        "m": $("#txtMNoRate").val() + ',' + $("#txtMYesRate").val(),
        "n": $("#txtNNoRate").val() + ',' + $("#txtNYesRate").val(),
        "o": $("#txtONoRate").val() + ',' + $("#txtOYesRate").val(),
        "p": $("#txtPNoRate").val() + ',' + $("#txtPYesRate").val(),
        "q": $("#txtQNoRate").val() + ',' + $("#txtQYesRate").val(),
        "r": $("#txtRNoRate").val() + ',' + $("#txtRYesRate").val(),
        "s": $("#txtSNoRate").val() + ',' + $("#txtSYesRate").val(),
        "t": $("#txtTNoRate").val() + ',' + $("#txtTYesRate").val(),
        "u": $("#txtUNoRate").val() + ',' + $("#txtUYesRate").val(),
        "v": $("#txtVNoRate").val() + ',' + $("#txtVYesRate").val(),
        "w": $("#txtWNoRate").val() + ',' + $("#txtWYesRate").val(),
        "x": $("#txtXNoRate").val() + ',' + $("#txtXYesRate").val(),
        "y": $("#txtYNoRate").val() + ',' + $("#txtYYesRate").val(),
        "z": $("#txtZNoRate").val() + ',' + $("#txtZYesRate").val()
    }
    var finaldata = JSON.stringify(data);
    $.ajax({
        url: 'http://www.funsports.win/Main/Admin.svc/Settings/SaveKeyShortcuts',
        method: 'POST',
        crossDomain: true,
        async: true,
        data: finaldata,
        headers: {
            "Token": favoriteCookie,
            "content-type": "application/json"
        },
        success: function (res) {
            console.log(res);
            if (res.status == "Success") {
                $.toast({
                    heading: 'Success',
                    text: res.result,
                    showHideTransition: 'slide',
                    icon: 'success'
                })
                GetKeyShortcuts();
            }
            if (res.status == "Failed") {
                $.toast({
                    heading: 'Error',
                    text: res.result,
                    showHideTransition: 'fade',
                    icon: 'error'
                })
            }
        },
        error: function (err) {
            if (err.status == 401) {
                window.location.href = "login.html";
            }
        }
    });
}

function GetKeyShortcuts() {

    $.ajax({
        url: 'http://www.funsports.win/Main/Admin.svc/Settings/GetKeyShortcuts',
        method: 'GET',
        async: true,
        crossDomain: true,
        headers: {
            "Token": favoriteCookie
        },
        success: function (res) {
            var a = res.data.a.split(",");
            $("#txtANoRate").val(a[0]);
            $("#txtAYesRate").val(a[1]);
            var b = res.data.b.split(",");
            $("#txtBNoRate").val(b[0]);
            $("#txtBYesRate").val(b[1]);
            var c = res.data.c.split(",");
            $("#txtCNoRate").val(c[0]);
            $("#txtCYesRate").val(c[1]);
            var d = res.data.d.split(",");
            $("#txtDNoRate").val(d[0]);
            $("#txtDYesRate").val(d[1]);
            var e = res.data.e.split(",");
            $("#txtENoRate").val(e[0]);
            $("#txtEYesRate").val(e[1]);
            var f = res.data.f.split(",");
            $("#txtFNoRate").val(f[0]);
            $("#txtFYesRate").val(f[1]);
            var g = res.data.g.split(",");
            $("#txtGNoRate").val(g[0]);
            $("#txtGYesRate").val(g[1]);
            var h = res.data.h.split(",");
            $("#txtHRate").val(h[0]);
            // $("#txtAYesRate").val(a[1]);
            var i = res.data.i.split(",");
            $("#txtINoRate").val(i[0]);
            $("#txtIYesRate").val(i[1]);
            var j = res.data.j.split(",");
            $("#txtJRate").val(j[0]);
            // $("#txtAYesRate").val(a[1]);
            var k = res.data.k.split(",");
            $("#txtCustNopoint").val(k[0]);
            $("#txtCustYespoint").val(k[1]);
            var l = res.data.l.split(",");
            $("#txtLNoRate").val(l[0]);
            $("#txtLYesRate").val(l[1]);
            var m = res.data.m.split(",");
            $("#txtMNoRate").val(m[0]);
            $("#txtMYesRate").val(m[1]);
            var n = res.data.n.split(",");
            $("#txtNNoRate").val(n[0]);
            $("#txtNYesRate").val(n[1]);
            var o = res.data.o.split(",");
            $("#txtONoRate").val(o[0]);
            $("#txtOYesRate").val(o[1]);
            var p = res.data.p.split(",");
            $("#txtPNoRate").val(p[0]);
            $("#txtPYesRate").val(p[1]);
            var q = res.data.q.split(",");
            $("#txtQNoRate").val(q[0]);
            $("#txtQYesRate").val(q[1]);
            var r = res.data.r.split(",");
            $("#txtRNoRate").val(r[0]);
            $("#txtRYesRate").val(r[1]);
            var s = res.data.s.split(",");
            $("#txtSNoRate").val(s[0]);
            $("#txtSYesRate").val(s[1]);
            var t = res.data.t.split(",");
            $("#txtTNoRate").val(t[0]);
            $("#txtTYesRate").val(t[1]);
            var u = res.data.u.split(",");
            $("#txtUNoRate").val(u[0]);
            $("#txtUYesRate").val(u[1]);
            var v = res.data.v.split(",");
            $("#txtVNoRate").val(v[0]);
            $("#txtVYesRate").val(v[1]);
            var w = res.data.w.split(",");
            $("#txtWNoRate").val(w[0]);
            $("#txtWYesRate").val(w[1]);
            var x = res.data.x.split(",");
            $("#txtXNoRate").val(x[0]);
            $("#txtXYesRate").val(x[1]);
            var y = res.data.y.split(",");
            $("#txtYNoRate").val(y[0]);
            $("#txtYYesRate").val(y[1]);
            var z = res.data.z.split(",");
            $("#txtZNoRate").val(z[0]);
            $("#txtZYesRate").val(z[1]);
        },
        error: function (err) {
            if (err.status == 401) {
                window.location.href = "login.html";
            }
        }
    })
}

function UpdateFancyRate() {
    var textinput = $('#txtRateformula').val().toUpperCase();
    var FID = $("#Fancyid").val();
    if (textinput == "") {
        $.toast({
            heading: 'Error',
            text: 'Please Enter Fancy Code',
            showHideTransition: 'fade',
            icon: 'error'
        })
        return false;
    }
    var Previousfnacyratevalue = localStorage.getItem("fnacyratevalue" + FID + "");
    if (Previousfnacyratevalue == undefined) {
        localStorage.setItem("fnacyratevalue" + FID + "", $("#txtNoRate1").val());
    } else {
        var ratePlus = parseInt(Previousfnacyratevalue) + parseInt($("#txtRateRang").val());
        var rateMinus = parseInt(Previousfnacyratevalue) - parseInt($("#txtRateRang").val());
    }
    if ($("#txtNoRate1").val() < rateMinus || ratePlus < $("#txtNoRate1").val()) {
        $("#rbtndeActive").prop('checked', true);
        UpdateBallStatus(2);
        bootbox.confirm("Current score update has bigger change than previous score (" + Previousfnacyratevalue + ") and rate Range defined (" + rateMinus + "-" + ratePlus + ") ?",
            function (result) {
                if (result == true) {
                    var data = {
                        "data": textinput,
                        "fancyId": FID
                    }
                    var finaldata = JSON.stringify(data);
                    $.ajax({
                        url: 'http://www.funsports.win/Main/Admin.svc/FancyRates/UpdateFancyRate',
                        method: 'POST',
                        crossDomain: true,
                        async: true,
                        data: finaldata,
                        headers: {
                            "Token": favoriteCookie,
                            "content-type": "application/json"
                        },
                        success: function (res) {
                            if (res.description.status == "Success") {
                                console.log(res)
                                if (res.description.result == "Current score update has bigger change than previous score and rate change defined") {
                                    $.toast({
                                        heading: 'Error',
                                        text: res.description.result,
                                        showHideTransition: 'fade',
                                        icon: 'error'
                                    });
                                    return false;
                                }
                                var ballStatus = res.data.ballStatus;
                                var fancyId = res.data.fancyId;
                                var noPrice = res.data.noPrice;
                                var noScore = res.data.noScore;
                                var yesPrice = res.data.yesPrice;
                                var yesScore = res.data.yesScore;
                                $('#txtNoRate1').val(noScore);
                                $('#txtNoPoint1').val(noPrice);
                                $('#txtYesRate1').val(yesScore);
                                $('#txtYesPoint1').val(yesPrice);
                                localStorage.setItem("fnacyratevalue" + FID + "", $("#txtNoRate1").val());
                                $("#rbtnActive").prop('checked', true);
                                UpdateBallStatus(1);
                                $.toast({
                                    heading: 'Success',
                                    text: res.description.result,
                                    showHideTransition: 'slide',
                                    icon: 'success'

                                })
                            }
                            if (res.description.status == "Failed") {
                                $.toast({
                                    heading: 'Error',
                                    text: res.description.result,
                                    showHideTransition: 'fade',
                                    icon: 'error'
                                })
                            }
                        },
                        error: function (err) {
                            if (err.status == 401) {
                                window.location.href = "login.html";
                            }
                        }
                    });
                }
                if (result == false) {
                    $("#rbtndeActive").prop('checked', true);
                    UpdateBallStatus(2);
                }
            })
    } else {
        var data = {
            "data": textinput,
            "fancyId": FID
        }
        var finaldata = JSON.stringify(data);
        $.ajax({
            url: 'http://www.funsports.win/Main/Admin.svc/FancyRates/UpdateFancyRate',
            method: 'POST',
            crossDomain: true,
            async: true,
            data: finaldata,
            headers: {
                "Token": favoriteCookie,
                "content-type": "application/json"
            },
            success: function (res) {
                if (res.description.status == "Success") {
                    console.log(res)
                    localStorage.setItem("fnacyratevalue" + FID + "", $("#txtNoRate1").val());
                    if (res.description.result == "Current score update has bigger change than previous score and rate change defined") {
                        $.toast({
                            heading: 'Error',
                            text: res.description.result,
                            showHideTransition: 'fade',
                            icon: 'error'
                        });
                        return false;
                    }
                    var ballStatus = res.data.ballStatus;
                    var fancyId = res.data.fancyId;
                    var noPrice = res.data.noPrice;
                    var noScore = res.data.noScore;
                    var yesPrice = res.data.yesPrice;
                    var yesScore = res.data.yesScore;
                    $('#txtNoRate1').val(noScore);
                    $('#txtNoPoint1').val(noPrice);
                    $('#txtYesRate1').val(yesScore);
                    $('#txtYesPoint1').val(yesPrice);
                    $.toast({
                        heading: 'Success',
                        text: res.description.result,
                        showHideTransition: 'slide',
                        icon: 'success'

                    })
                }
                if (res.description.status == "Failed") {
                    $.toast({
                        heading: 'Error',
                        text: res.description.result,
                        showHideTransition: 'fade',
                        icon: 'error'
                    })
                }
            },
            error: function (err) {
                if (err.status == 401) {
                    window.location.href = "login.html";
                }
            }
        });
    }

}

function UpdFancySettings() {
    var FID = $("#Fancyid").val();
    var maxstake = $('#txtMaxStack').val();
    var minstake = $('#txtMinStack').val();
    var ratediff = $('#txtRatedifferent').val();
    var raterange = $('#txtRateRang').val();
    var maxStakePerRate = $('#maxstakeperrate').val();
    var data = {
        "fancyId": FID,
        "maxStake": maxstake,
        "maxStakePerRate": maxStakePerRate,
        "minStake": minstake,
        "rateDiff": ratediff,
        "rateRange": raterange
    }
    var finaldata = JSON.stringify(data);
    // var fancydata = JSON.parse(localStorage.getItem("fancyData"));
    fancydata.maxStake = $('#txtMaxStack').val();
    fancydata.minStake = $('#txtMinStack').val();
    fancydata.rateDifference = $('#txtRatedifferent').val();
    fancydata.maxStakePerRate = $('#maxstakeperrate').val();
    fancydata.rateRange = $('#txtRateRang').val();
    localStorage.setItem("fancyData", JSON.stringify(fancydata));
    $.ajax({
        url: 'http://www.funsports.win/Main/Admin.svc/Fancy/UpdFancySettings',
        method: 'POST',
        crossDomain: true,
        async: true,
        data: finaldata,
        headers: {
            "Token": favoriteCookie,
            "content-type": "application/json"
        },
        success: function (res) {
            if (res.status == "Success") {
                console.log("fancysetting" + res);
                $.toast({
                    heading: 'Success',
                    text: res.result,
                    showHideTransition: 'slide',
                    icon: 'success'
                })
            }
            if (res.status == "Failed") {
                $.toast({
                    heading: 'Error',
                    text: res.result,
                    showHideTransition: 'fade',
                    icon: 'error'
                })
            }
        },
        error: function (err) {
            if (err.status == 401) {
                window.location.href = "login.html";
            }
        }
    });
}

// Returns an array of numbers located in the string
function get_numbers(input) {
    return input.match(/[0-9]+/g);
}

//Alphabet Onclick values are here

function Abtn(txt) {
    var textval = $("#txtRateformula").val();
    if (textval == '') {
        $.toast({
            heading: 'Warning',
            text: "Please Enter Rates",
            showHideTransition: 'fade',
            icon: 'warning'
        })
        return false;
    } else {
        textval = get_numbers(textval);
        $("#txtRateformula").val(textval + '' + txt);
        $("#txtNoPoint1").val($("#txtANoRate").val());
        $("#txtYesPoint1").val($("#txtAYesRate").val());
        $('#txtYesRate1').val($('#txtNoRate1').val());
        UpdateFancyRate();
    }
}
function Bbtn(txt) {
    var textval = $("#txtRateformula").val();
    if (textval == '') {
        $.toast({
            heading: 'Warning',
            text: "Please Enter Rates",
            showHideTransition: 'fade',
            icon: 'warning'
        })
        return false;
    } else {
        textval = get_numbers(textval);
        $("#txtRateformula").val(textval + '' + txt);
        $("#txtNoPoint1").val($("#txtBNoRate").val());
        $("#txtYesPoint1").val($("#txtBYesRate").val());
        $('#txtYesRate1').val($('#txtNoRate1').val());
        UpdateFancyRate();
    }
}
function Cbtn(txt) {
    var textval = $("#txtRateformula").val();
    if (textval == '') {
        $.toast({
            heading: 'Warning',
            text: "Please Enter Rates",
            showHideTransition: 'fade',
            icon: 'warning'
        })
        return false;
    } else {
        textval = get_numbers(textval);
        $("#txtRateformula").val(textval + '' + txt);
        $("#txtNoPoint1").val($("#txtCNoRate").val());
        $("#txtYesPoint1").val($("#txtCYesRate").val());
        $('#txtYesRate1').val($('#txtNoRate1').val());
        UpdateFancyRate();
    }
}
function Dbtn(txt) {
    var textval = $("#txtRateformula").val();
    if (textval == '') {
        $.toast({
            heading: 'Warning',
            text: "Please Enter Rates",
            showHideTransition: 'fade',
            icon: 'warning'
        })
        return false;
    } else {
        textval = get_numbers(textval);
        $("#txtRateformula").val(textval + '' + txt);
        $("#txtNoPoint1").val($("#txtDNoRate").val());
        $("#txtYesPoint1").val($("#txtDYesRate").val());
        $('#txtYesRate1').val($('#txtNoRate1').val());
        UpdateFancyRate();
    }
}
function Ebtn(txt) {
    var textval = $("#txtRateformula").val();
    if (textval == '') {
        $.toast({
            heading: 'Warning',
            text: "Please Enter Rates",
            showHideTransition: 'fade',
            icon: 'warning'
        })
        return false;
    } else {
        textval = get_numbers(textval);
        $("#txtRateformula").val(textval + '' + txt);
        $("#txtNoPoint1").val($("#txtENoRate").val());
        $("#txtYesPoint1").val($("#txtEYesRate").val());
        $('#txtYesRate1').val($('#txtNoRate1').val());
        UpdateFancyRate();
    }
}
function Fbtn(txt) {
    var textval = $("#txtRateformula").val();
    if (textval == '') {
        $.toast({
            heading: 'Warning',
            text: "Please Enter Rates",
            showHideTransition: 'fade',
            icon: 'warning'
        })
        return false;
    } else {
        textval = get_numbers(textval);
        $("#txtRateformula").val(textval + '' + txt);
        $("#txtNoPoint1").val($("#txtFNoRate").val());
        $("#txtYesPoint1").val($("#txtFYesRate").val());
        $('#txtYesRate1').val($('#txtNoRate1').val());
        UpdateFancyRate();
    }
}
function Gbtn(txt) {
    var textval = $("#txtRateformula").val();
    if (textval == '') {
        $.toast({
            heading: 'Warning',
            text: "Please Enter Rates",
            showHideTransition: 'fade',
            icon: 'warning'
        })
        return false;
    } else {
        textval = get_numbers(textval);
        $("#txtRateformula").val(textval + '' + txt);
        $("#txtNoPoint1").val($("#txtGNoRate").val());
        $("#txtYesPoint1").val($("#txtGYesRate").val());
        $('#txtYesRate1').val($('#txtNoRate1').val());
        UpdateFancyRate();
    }
}
function Hbtn(txt) {
    var textval = $("#txtRateformula").val();
    if (textval == '') {
        $.toast({
            heading: 'Warning',
            text: "Please Enter Rates",
            showHideTransition: 'fade',
            icon: 'warning'
        })
        return false;
    } else {
        textval = get_numbers(textval);
        $("#txtRateformula").val(textval + '' + txt);
        var Hvalue = $("#txtHRate").val();
        var norate = $('#txtNoRate1').val();
        var addnum = parseInt(norate) + parseInt(Hvalue);
        $('#txtYesRate1').val(addnum);
        $('#txtNoPoint1').val(100);
        $('#txtYesPoint1').val(100);
        UpdateFancyRate();
    }
}
function Ibtn(txt) {
    var textval = $("#txtRateformula").val();
    if (textval == '') {
        $.toast({
            heading: 'Warning',
            text: "Please Enter Rates",
            showHideTransition: 'fade',
            icon: 'warning'
        })
        return false;
    } else {
        textval = get_numbers(textval);
        $("#txtRateformula").val(textval + '' + txt);
        $("#txtNoPoint1").val($("#txtINoRate").val());
        $("#txtYesPoint1").val($("#txtIYesRate").val());
        $('#txtYesRate1').val($('#txtNoRate1').val());
        UpdateFancyRate();
    }
}
function Jbtn(txt) {
    var textval = $("#txtRateformula").val();
    if (textval == '') {
        $.toast({
            heading: 'Warning',
            text: "Please Enter Rates",
            showHideTransition: 'fade',
            icon: 'warning'
        })
        return false;
    } else {
        textval = get_numbers(textval);
        $("#txtRateformula").val(textval + '' + txt);
        var Jvalue = $("#txtJRate").val();
        var norate = $('#txtNoRate1').val();
        var addnum = parseInt(norate) + parseInt(Jvalue);
        $('#txtYesRate1').val(addnum);
        $('#txtNoPoint1').val(100);
        $('#txtYesPoint1').val(100);
        UpdateFancyRate();
    }
}
function Kbtn(txt) {
    var textval = $("#txtRateformula").val();
    if (textval == '') {
        $.toast({
            heading: 'Warning',
            text: "Please Enter Rates",
            showHideTransition: 'fade',
            icon: 'warning'
        })
        return false;
    } else {
        textval = get_numbers(textval);
        $("#txtRateformula").val(textval + '' + txt);
        $("#txtNoPoint1").val($("#txtCustNopoint").val());
        $('#txtYesRate1').val($('#txtNoRate1').val());
        $("#txtYesPoint1").val($("#txtCustYespoint").val());
        UpdateFancyRate();
    }
}
function Lbtn(txt) {
    var textval = $("#txtRateformula").val();
    if (textval == '') {
        $.toast({
            heading: 'Warning',
            text: "Please Enter Rates",
            showHideTransition: 'fade',
            icon: 'warning'
        })
        return false;
    } else {
        textval = get_numbers(textval);
        $("#txtRateformula").val(textval + '' + txt);
        $("#txtNoPoint1").val($("#txtLNoRate").val());
        $('#txtYesRate1').val($('#txtNoRate1').val());
        $("#txtYesPoint1").val($("#txtLYesRate").val());
        UpdateFancyRate();
    }
}
function Mbtn(txt) {
    var textval = $("#txtRateformula").val();
    if (textval == '') {
        $.toast({
            heading: 'Warning',
            text: "Please Enter Rates",
            showHideTransition: 'fade',
            icon: 'warning'
        })
        return false;
    } else {
        textval = get_numbers(textval);
        $("#txtRateformula").val(textval + '' + txt);
        $("#txtNoPoint1").val($("#txtMNoRate").val());
        $('#txtYesRate1').val($('#txtNoRate1').val());
        $("#txtYesPoint1").val($("#txtMYesRate").val());
        UpdateFancyRate();
    }
}
function Nbtn(txt) {
    var textval = $("#txtRateformula").val();
    if (textval == '') {
        $.toast({
            heading: 'Warning',
            text: "Please Enter Rates",
            showHideTransition: 'fade',
            icon: 'warning'
        })
        return false;
    } else {
        textval = get_numbers(textval);
        $("#txtRateformula").val(textval + '' + txt);
        $("#txtNoPoint1").val($("#txtNNoRate").val());
        $('#txtYesRate1').val($('#txtNoRate1').val());
        $("#txtYesPoint1").val($("#txtNYesRate").val());
        UpdateFancyRate();
    }
}
function Obtn(txt) {
    var textval = $("#txtRateformula").val();
    if (textval == '') {
        $.toast({
            heading: 'Warning',
            text: "Please Enter Rates",
            showHideTransition: 'fade',
            icon: 'warning'
        })
        return false;
    } else {
        textval = get_numbers(textval);
        $("#txtRateformula").val(textval + '' + txt);
        $("#txtNoPoint1").val($("#txtONoRate").val());
        $('#txtYesRate1').val($('#txtNoRate1').val());
        $("#txtYesPoint1").val($("#txtOYesRate").val());
        UpdateFancyRate();
    }
}
function Pbtn(txt) {
    var textval = $("#txtRateformula").val();
    if (textval == '') {
        $.toast({
            heading: 'Warning',
            text: "Please Enter Rates",
            showHideTransition: 'fade',
            icon: 'warning'
        })
        return false;
    } else {
        textval = get_numbers(textval);
        $("#txtRateformula").val(textval + '' + txt);
        $("#txtNoPoint1").val($("#txtPNoRate").val());
        $('#txtYesRate1').val($('#txtNoRate1').val());
        $("#txtYesPoint1").val($("#txtPYesRate").val());
        UpdateFancyRate();
    }
}
function Qbtn(txt) {
    var textval = $("#txtRateformula").val();
    if (textval == '') {
        $.toast({
            heading: 'Warning',
            text: "Please Enter Rates",
            showHideTransition: 'fade',
            icon: 'warning'
        })
        return false;
    } else {
        textval = get_numbers(textval);
        $("#txtRateformula").val(textval + '' + txt)
        $("#txtNoPoint1").val($("#txtQNoRate").val());
        $('#txtYesRate1').val($('#txtNoRate1').val());
        $("#txtYesPoint1").val($("#txtQYesRate").val());
        UpdateFancyRate();
    }

}
function Rbtn(txt) {
    var textval = $("#txtRateformula").val();
    if (textval == '') {
        $.toast({
            heading: 'Warning',
            text: "Please Enter Rates",
            showHideTransition: 'fade',
            icon: 'warning'
        })
        return false;
    } else {
        textval = get_numbers(textval);
        $("#txtRateformula").val(textval + '' + txt);
        $("#txtNoPoint1").val($("#txtRNoRate").val());
        $('#txtYesRate1').val($('#txtNoRate1').val());
        $("#txtYesPoint1").val($("#txtRYesRate").val());
        UpdateFancyRate();
    }
}
function Sbtn(txt) {
    var textval = $("#txtRateformula").val();
    if (textval == '') {
        $.toast({
            heading: 'Warning',
            text: "Please Enter Rates",
            showHideTransition: 'fade',
            icon: 'warning'
        })
        return false;
    } else {
        textval = get_numbers(textval);
        $("#txtRateformula").val(textval + '' + txt);
        $("#txtNoPoint1").val($("#txtSNoRate").val());
        $('#txtYesRate1').val($('#txtNoRate1').val());
        $("#txtYesPoint1").val($("#txtSYesRate").val());
        UpdateFancyRate();
    }
}
function Tbtn(txt) {
    var textval = $("#txtRateformula").val();
    if (textval == '') {
        $.toast({
            heading: 'Warning',
            text: "Please Enter Rates",
            showHideTransition: 'fade',
            icon: 'warning'
        })
        return false;
    } else {
        textval = get_numbers(textval);
        $("#txtRateformula").val(textval + '' + txt);
        $("#txtNoPoint1").val($("#txtTNoRate").val());
        $('#txtYesRate1').val($('#txtNoRate1').val());
        $("#txtYesPoint1").val($("#txtTYesRate").val());
        UpdateFancyRate();
    }
}
function Ubtn(txt) {
    var textval = $("#txtRateformula").val();
    if (textval == '') {
        $.toast({
            heading: 'Warning',
            text: "Please Enter Rates",
            showHideTransition: 'fade',
            icon: 'warning'
        })
        return false;
    } else {
        textval = get_numbers(textval);
        $("#txtRateformula").val(textval + '' + txt);
        $("#txtNoPoint1").val($("#txtUNoRate").val());
        $('#txtYesRate1').val($('#txtNoRate1').val());
        $("#txtYesPoint1").val($("#txtUYesRate").val());
        UpdateFancyRate();
    }
}
function Vbtn(txt) {
    var textval = $("#txtRateformula").val();
    if (textval == '') {
        $.toast({
            heading: 'Warning',
            text: "Please Enter Rates",
            showHideTransition: 'fade',
            icon: 'warning'
        })
        return false;
    } else {
        textval = get_numbers(textval);
        $("#txtRateformula").val(textval + '' + txt);
        $("#txtNoPoint1").val($("#txtVNoRate").val());
        $('#txtYesRate1').val($('#txtNoRate1').val());
        $("#txtYesPoint1").val($("#txtVYesRate").val());
        UpdateFancyRate();
    }
}
function Wbtn(txt) {
    var textval = $("#txtRateformula").val();
    if (textval == '') {
        $.toast({
            heading: 'Warning',
            text: "Please Enter Rates",
            showHideTransition: 'fade',
            icon: 'warning'
        })
        return false;
    } else {
        textval = get_numbers(textval);
        $("#txtRateformula").val(textval + '' + txt);
        $("#txtNoPoint1").val($("#txtWNoRate").val());
        $('#txtYesRate1').val($('#txtNoRate1').val());
        $("#txtYesPoint1").val($("#txtWYesRate").val());
        UpdateFancyRate();
    }
}
function Xbtn(txt) {
    var textval = $("#txtRateformula").val();
    if (textval == '') {
        $.toast({
            heading: 'Warning',
            text: "Please Enter Rates",
            showHideTransition: 'fade',
            icon: 'warning'
        })
        return false;
    } else {
        textval = get_numbers(textval);
        $("#txtRateformula").val(textval + '' + txt);
        $("#txtNoPoint1").val($("#txtXNoRate").val());
        $('#txtYesRate1').val($('#txtNoRate1').val());
        $("#txtYesPoint1").val($("#txtXYesRate").val());
        UpdateFancyRate();
    }
}
function Ybtn(txt) {
    var textval = $("#txtRateformula").val();
    if (textval == '') {
        $.toast({
            heading: 'Warning',
            text: "Please Enter Rates",
            showHideTransition: 'fade',
            icon: 'warning'
        })
        return false;
    } else {
        textval = get_numbers(textval);
        $("#txtRateformula").val(textval + '' + txt);
        $("#txtNoPoint1").val($("#txtYNoRate").val());
        $('#txtYesRate1').val($('#txtNoRate1').val());
        $("#txtYesPoint1").val($("#txtYYesRate").val());
        UpdateFancyRate();
    }
}
function Zbtn(txt) {
    var textval = $("#txtRateformula").val();
    if (textval == '') {
        $.toast({
            heading: 'Warning',
            text: "Please Enter Rates",
            showHideTransition: 'fade',
            icon: 'warning'
        })
        return false;
    } else {
        textval = get_numbers(textval);
        $("#txtRateformula").val(textval + '' + txt);
        $("#txtNoPoint1").val($("#txtZNoRate").val());
        $('#txtYesRate1').val($('#txtNoRate1').val());
        $("#txtYesPoint1").val($("#txtZYesRate").val());
        UpdateFancyRate();
    }
}

function UpdBetStatus(status) {
    var F_ID = $("#Fancyid").val();
    $.ajax({
        url: 'http://www.funsports.win/Main/Admin.svc/FancyRates/UpdBetStatus?id=' + F_ID + '&status=' + status,
        method: 'POST',
        crossDomain: true,
        async: true,
        headers: {
            "Token": favoriteCookie
        },
        success: function (res) {
            console.log(res);
            if (res.status == "Success") {
                $.toast({
                    heading: 'Success',
                    text: res.result,
                    showHideTransition: 'slide',
                    icon: 'success'
                })
            }
            if (res.status == "Failed") {
                $.toast({
                    heading: 'Error',
                    text: res.result,
                    showHideTransition: 'fade',
                    icon: 'error'
                })
            }
        },
        error: function (err) {
            if (err.status == 401) {
                window.location.href = "login.html";
            }
        }
    });
}

function UpdateBallStatus(status) {
    var F_ID = $("#Fancyid").val();
    if (status == 2) {
        $('#txtRateformula').val('');
        $('#txtNoRate1').val('');
        $('#txtNoPoint1').val('');
        $('#txtYesRate1').val('');
        $('#txtYesPoint1').val('');
    }
    $.ajax({
        url: 'http://www.funsports.win/Main/Admin.svc/FancyRates/UpdateBallStatus?id=' + F_ID + '&status=' + status,
        method: 'POST',
        crossDomain: true,
        async: true,
        headers: {
            "Token": favoriteCookie
        },
        success: function (res) {
            // console.log(res);
            // if (res.status == "Success") {
            //     $.toast({
            //         heading: 'Success',
            //         text: res.result,
            //         showHideTransition: 'slide',
            //         icon: 'success'
            //     })
            // }
            if (res.status == "Failed") {
                $.toast({
                    heading: 'Error',
                    text: res.result,
                    showHideTransition: 'fade',
                    icon: 'error'
                })
            }
        },
        error: function (err) {
            if (err.status == 401) {
                window.location.href = "login.html";
            }
        }
    });
}

function LastBallStatus() {
    var F_ID = $("#Fancyid").val();
    $.ajax({
        url: 'http://www.funsports.win/Main/Admin.svc/FancyRates/LastBallStatus?id=' + F_ID,
        method: 'GET',
        async: true,
        crossDomain: true,
        headers: {
            "Token": favoriteCookie
        },
        success: function (res) {
            console.log(res);
            if (res == 1) {
                $('#rbtnActive').prop('checked', true);
            } else if (res == 2) {
                $('#rbtndeActive').prop('checked', true);
            } else if (res == 4) {
                $('#rbtnInactive').prop('checked', true);
            }
        },
        error: function (err) {
            if (err.status == 401) {
                window.location.href = "login.html";
            }
        }
    });
}

function UpdateFancyRateStatus(staus) {
    var F_ID = $("#Fancyid").val();
    $.ajax({
        url: 'http://www.funsports.win/Main/Admin.svc/Fancy/UpdateFancyStatus?id=' + F_ID + '&status=' + staus,
        method: 'POST',
        crossDomain: true,
        async: true,
        headers: {
            "Token": favoriteCookie
        },
        success: function (res) {
            console.log(res);
            if (res.status == "Success") {
                $.toast({
                    heading: 'Success',
                    text: res.result,
                    showHideTransition: 'slide',
                    icon: 'success'
                })
            }
            if (res.status == "Failed") {
                $.toast({
                    heading: 'Error',
                    text: res.result,
                    showHideTransition: 'fade',
                    icon: 'error'
                })
            }
        },
        error: function (err) {
            if (err.status == 401) {
                window.location.href = "login.html";
            }
        }
    });
}

function UpdateFancyBetStatus(status) {
    var F_ID = $("#Fancyid").val();
    $.ajax({
        url: 'http://www.funsports.win/Main/Admin.svc/Fancy/UpdateFancyBetStatus?id=' + F_ID + '&status=' + status,
        method: 'POST',
        crossDomain: true,
        async: true,
        headers: {
            "Token": favoriteCookie
        },
        success: function (res) {
            console.log(res);
            if (res.status == "Success") {
                // var fancydata = JSON.parse(localStorage.getItem("fancyData"));
                fancydata.isBetAllow = status;
                // localStorage.setItem("fancyData", JSON.stringify(fancydata));
                $.toast({
                    heading: 'Success',
                    text: res.result,
                    showHideTransition: 'slide',
                    icon: 'success'
                })
            }
            if (res.status == "Failed") {
                $.toast({
                    heading: 'Error',
                    text: res.result,
                    showHideTransition: 'fade',
                    icon: 'error'
                })
            }
        },
        error: function (err) {
            if (err.status == 401) {
                window.location.href = "login.html";
            }
        }
    });
}

function UpdateFancyCommStatus(status) {
    var F_ID = $("#Fancyid").val();
    $.ajax({
        url: 'http://www.funsports.win/Main/Admin.svc/DataManagement/UpdateFancyCommStatus?id=' + F_ID + '&status=' + status,
        method: 'POST',
        crossDomain: true,
        async: true,
        headers: {
            "Token": favoriteCookie
        },
        success: function (res) {
            console.log(res);
            if (res.status == "Success") {
                // var fancydata = JSON.parse(localStorage.getItem("fancyData"));
                fancydata.isApplyComm = status;
                // localStorage.setItem("fancyData", JSON.stringify(fancydata));
                $.toast({
                    heading: 'Success',
                    text: res.result,
                    showHideTransition: 'slide',
                    icon: 'success'
                })
            }
            if (res.status == "Failed") {
                $.toast({
                    heading: 'Error',
                    text: res.result,
                    showHideTransition: 'fade',
                    icon: 'error'
                })
            }
        },
        error: function (err) {
            if (err.status == 401) {
                window.location.href = "login.html";
            }
        }
    });
}


