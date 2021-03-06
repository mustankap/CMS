from django.db import models
from django.contrib.auth.models import User
from vendors.models import Vendor
from users.models import Branch
from datetime import datetime


class AttendanceSheet(models.Model):
    sheet_created = models.DateField(default=datetime.now)
    invoice = models.FileField(blank=True, null=True, upload_to="invoice")
    verified = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.sheet_created} -> {self.verified}"


class Attendance(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    entry_time = models.DateTimeField(default=datetime.now)
    exit_time = models.DateTimeField(blank=True, null=True)
    vendor = models.ForeignKey(Vendor, on_delete=models.SET_NULL, null=True, blank=True)
    added_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    branch = models.ForeignKey(Branch, on_delete=models.SET_NULL, null=True, blank=True)
    attendance_sheet = models.ForeignKey(
        AttendanceSheet, on_delete=models.SET_NULL, null=True, blank=True
    )

    def __str__(self) -> str:
        return f"{self.first_name} {self.last_name}"


class Issue(models.Model):
    comment = models.CharField(max_length=200)
    vendor = models.ForeignKey(Vendor, on_delete=models.SET_NULL, null=True, blank=True)
    reverted_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True
    )
    sheet = models.ForeignKey(
        AttendanceSheet, on_delete=models.SET_NULL, null=True, blank=True
    )
    created_at = models.DateTimeField(default=datetime.now)

    def __str__(self) -> str:
        return f"{self.comment} {self.vendor} {self.reverted_by} -> {self.sheet}"
