/**
 * 
 */
$(document).ready(function(){
	function openTab(evt, cityName) {
	    var i, tabcontent, tablinks;
	    tabcontent = document.getElementsByClassName("tabcontent");
	    for (i = 0; i < tabcontent.length; i++) {
	        tabcontent[i].style.display = "none";
	    }
	    tablinks = document.getElementsByClassName("tablinks");
	    for (i = 0; i < tablinks.length; i++) {
	        tablinks[i].className = tablinks[i].className.replace(" active", "");
	    }
	    document.getElementById(cityName).style.display = "block";
	    evt.currentTarget.className += " active";
	}
	var System = angular.module("System", []);

	System.controller('Manager', function($scope) {
	   $scope.Manager = {
		Manager:[
	         {
	        	 link: rootPath +"0003/",
	        	 image:"../resources/img/image_user.jpg",
	        	 title:"Quản Lý Manager",
	        	 kind: "Manager"
	         },
	         {
	        	 link: rootPath +"0040/",
	        	 image:"../resources/img/Kdm-user-male-icon.png",
	        	 title:"Quản Lý Thanh Niên",
	        	 kind: "Thanh Niên"
	         },
	         {
	        	 link: rootPath +"0009/",
	        	 image:"../resources/img/category-icon.png",
	        	 title:"Thiết Lập Dạng Thanh Niên",
	        	 kind: "Dạng Thanh Niên"
	         },
	         {
	        	 link: rootPath +"0005/",
	        	 image:"../resources/img/medical-report-icon.png",
	        	 title:"Biểu Mẫu Báo Cáo",
	        	 kind: "Biểu Mẫu Báo Cáo"
	         },
	         {
	        	 link: rootPath +"0003/",
	        	 image:"../resources/img/Notepad-Bloc-notes-icon.png",
	        	 title:"Ghi Chú Cho Từng Biểu Mẫu",
	        	 kind: "Ghi Chú"
	         },
	         {
	        	 link: rootPath +"0006/",
	        	 image:"../resources/img/Actions-view-list-details-icon.png",
		   		 title:"Chi Tiết Mục Lục Của Biểu Mẫu",
		   		 kind: "Chi Tiết Biểu Mẫu"
	         },
	         {
	        	 link: rootPath +"0025/",
	        	 image:"../resources/img/Mimetypes-application-x-qet-element-icon.png",
	        	 title:"Quản Lý Tiêu Chí Cho Biểu Mẫu",
	        	 kind: "Tiêu Chí Biểu Mẫu"
	         },
	         {
	        	 link: rootPath +"0010/",
	        	 image:"../resources/img/contract.png",
	        	 title:"Quản Lý Chữ Ký",
	        	 kind: "Chữ Ký"
	         },
	         {
	        	 link: rootPath +"0011/",
	        	 image:"../resources/img/Country-icon.png",
	        	 title:"Quản Lý Thông Tin Quốc Tịch",
	        	 kind: "Quốc Tịch"
	         },
	         {
	        	 link: rootPath +"0012/",
	        	 image:"../resources/img/flats.png",
	        	 title:"Quản Lý Tỉnh/Thành Phố",
	        	 kind: "Tỉnh/Thành Phố"
	         },
	         {
	        	 link: rootPath +"0013/",
	        	 image:"../resources/img/Map_District_Plain_Red.png",
	        	 title:"Quản Lý Quận/Huyện",
	        	 kind: "Quận/Huyện"
	         },
	         {
	        	 link: rootPath +"0014/",
	        	 image:"../resources/img/placeholder.png",
	        	 title:"Quản Lý Phường/Xã",
	        	 kind: "Phường/Xã"
	         },
	         {
	        	 link: rootPath +"0015/",
	        	 image:"../resources/img/placeholder_ward.png",
	        	 title:"Quản Lý Khu Phố",
	        	 kind: "Khu Phố"
	         },
	         {
	        	 link: rootPath +"0016/",
	        	 image:"../resources/img/network.png",
	        	 title:"Quản Lý Tổ Dân Phố",
	        	 kind: "Tổ Dân Phố"
	         },
	         {
	        	 link: rootPath +"0022/",
	        	 image:"../resources/img/mortarboard.png",
	        	 title:"Thống Kê Trình Độ Học Vấn",
	        	 kind: "Trình Độ Học Vấn"
	         },
	         {
	        	 link: rootPath +"0018/",
	        	 image:"../resources/img/university.png",
	        	 title:"Thống Kê Đại Học/Cao Đẳng/Trung Cấp",
	        	 kind: "Đại Học"
	         },
	         {
	        	 link: rootPath +"0019/",
	        	 image:"../resources/img/engineer.png",
	        	 title:"Thống Kê Chuyên Ngành",
	        	 kind: "Chuyên Ngành"
	         },
	         {
	        	 link: rootPath +"0003/",
	        	 image:"../resources/img/grandparents-with-child.png",
	        	 title:"Quản Lý Thân Nhân Thanh Niên",
	        	 kind: "Thân Nhân"
	         },
	         {
	        	 link: rootPath +"0003/",
	        	 image:"../resources/img/farmer.png",
	        	 title:"Quản Lý Công Việc",
	        	 kind: "Công Việc"
	         },
	         {
	        	 link: rootPath +"0003/",
	        	 image:"../resources/img/map-grid-with-placeholder-interface-symbol.png",
	        	 title:"Thiết Lập Vùng Sinh Sống",
	        	 kind: "Vùng Sinh Sống"
	         }
	      ],
	      hoten: function() {
	         var doituongsinhvien;
	         doituongsinhvien = $scope.sinhvien;
	         return doituongsinhvien.ho + " " + doituongsinhvien.ten;
	      }
	   };
	});
});


