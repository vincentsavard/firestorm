#!/usr/bin/env python
import subprocess

CURRENT_BRANCH_COMMAND = "git rev-parse --abbrev-ref HEAD"
CURRENT_REVISION_COMMAND = "git rev-parse --short HEAD"

VERSION_JSON_CONTENT = """{{
  "version": "{0}"
}}
"""

class CouldNotFindBranchNameError(Exception): pass

def get_current_branch():
    return execute_command(CURRENT_BRANCH_COMMAND.split())

def get_current_revision():
    return execute_command(CURRENT_REVISION_COMMAND.split())

def execute_command(command):
    process = subprocess.Popen(command, stdout=subprocess.PIPE)
    return process.stdout.read().decode("utf-8").strip()

def write_version_py_file(file_path):
    with open(file_path, "w") as file_handle:
        file_handle.write(VERSION_JSON_CONTENT.format(get_current_revision()))

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Write version.py")
    parser.add_argument("path", help="path to version.py")

    args = parser.parse_args()

    write_version_py_file(args.path)
