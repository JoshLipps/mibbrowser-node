#!/usr/bin/perl

use warnings;

my $filename = shift();
my $outfile = shift();

open(MIB, "<", $filename)
    or die("Can't open < $filename.\n");

open(JSOUT, ">", $outfile)
    or die("Can't open > $outfile.\n");

while(<MIB>) {
    ($oid, $desc) = split(/\t/, $_);
    chomp($desc);

    @mib = split(/\./, $oid);
    
    print("ucdavis[\"".join("\"][\"",@mib)."\"] = { \"name\": \"$desc\", \"oid\": $oid }\;\n");
}