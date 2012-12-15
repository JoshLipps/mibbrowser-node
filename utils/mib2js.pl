#!/usr/bin/perl

use JSON;

sub usage() {
    print("Makes a snmptranslate -Tz into ugly JS.\n");
    print("\tUsage: $0 inFile outFile\n");
}

my $filename = shift();
my $outfile = shift();
my %monstrosity;

if(!defined($filename) | !defined($outfile)) { usage(); exit(1); }

open(MIB, "<", $filename)
    or die("Can't open < $filename.\n");

open(JSOUT, ">", $outfile)
    or die("Can't open > $outfile.\n");

while(<MIB>) {
    ($oid, $desc) = split(/\t/, $_);
    chomp($desc);

    @mib = split(/\./, $oid);

    print(JSOUT "ucdavis[\"".join("\"][\"",@mib)."\"] = { \"name\": \"$desc\", \"oid\": $oid }\;\n");


}
